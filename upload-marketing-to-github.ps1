param(
  [Parameter(Mandatory = $true)]
  [string]$Owner,

  [Parameter(Mandatory = $true)]
  [string]$Repo,

  [Parameter(Mandatory = $true)]
  [string]$Token,

  [string]$Branch = "main",
  [string]$CommitMessage = "Upload marketing website"
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$ApiBase = "https://api.github.com/repos/$Owner/$Repo"

if ([string]::IsNullOrWhiteSpace($Token) -or $Token -eq "ghp_..." -or $Token -eq "PASTE_YOUR_TOKEN_HERE") {
  throw "GitHub token is missing or still a placeholder. Set `$env:GITHUB_TOKEN to a real token and run the command again."
}

$Headers = @{
  Authorization = "Bearer $Token"
  Accept = "application/vnd.github+json"
  "X-GitHub-Api-Version" = "2022-11-28"
  "User-Agent" = "contact-center-marketing-uploader"
}

$ExcludedDirectories = @(
  "node_modules",
  "dist",
  ".git"
)

$ExcludedFiles = @(
  ".env",
  ".env.local",
  "upload-marketing-to-github.ps1"
)

function Convert-ToGitPath {
  param([string]$FullPath)

  $relative = $FullPath.Substring($ProjectRoot.Length).TrimStart("\", "/")
  return ($relative -replace "\\", "/")
}

function Test-IsExcluded {
  param([System.IO.FileInfo]$File)

  if ($ExcludedFiles -contains $File.Name) {
    return $true
  }

  $relative = Convert-ToGitPath $File.FullName
  foreach ($directory in $ExcludedDirectories) {
    if ($relative -eq $directory -or $relative.StartsWith("$directory/")) {
      return $true
    }
  }

  return $false
}

function Invoke-GitHubApi {
  param(
    [string]$Method,
    [string]$Uri,
    [object]$Body = $null
  )

  if ($null -eq $Body) {
    return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $Headers
  }

  $json = $Body | ConvertTo-Json -Depth 100
  return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $Headers -Body $json -ContentType "application/json"
}

function Upload-FilesWithContentsApi {
  param([array]$FilesToUpload)

  Write-Host "Repository is empty. Creating files through the Contents API..."

  $index = 0
  foreach ($file in $FilesToUpload) {
    $index += 1
    $path = Convert-ToGitPath $file.FullName
    Write-Host "Creating file ($index/$($FilesToUpload.Count)): $path"

    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $content = [Convert]::ToBase64String($bytes)

    Invoke-GitHubApi -Method "PUT" -Uri "$ApiBase/contents/$path" -Body @{
      message = "$CommitMessage - $path"
      content = $content
      branch = $Branch
    } | Out-Null
  }

  Write-Host ""
  Write-Host "Done."
  Write-Host "Repository: https://github.com/$Owner/$Repo"
}

Write-Host "Project root: $ProjectRoot"
Write-Host "Target repo: https://github.com/$Owner/$Repo"
Write-Host "Branch: $Branch"

try {
  Invoke-GitHubApi -Method "GET" -Uri $ApiBase | Out-Null
} catch {
  $statusCode = $null
  if ($_.Exception.Response) {
    $statusCode = [int]$_.Exception.Response.StatusCode
  }

  if ($statusCode -eq 401) {
    throw "GitHub returned 401 Unauthorized. The token is invalid, expired, or was not passed correctly."
  }

  if ($statusCode -eq 403) {
    throw "GitHub returned 403 Forbidden. The token is valid but does not have permission. Give it Contents read/write access for this repository."
  }

  if ($statusCode -eq 404) {
    throw "GitHub returned 404 Not Found. The repository https://github.com/$Owner/$Repo does not exist, or the token does not have access to it."
  }

  throw "Could not access https://github.com/$Owner/$Repo. GitHub status: $statusCode. Original error: $($_.Exception.Message)"
}

$files = Get-ChildItem -Path $ProjectRoot -File -Recurse | Where-Object {
  -not (Test-IsExcluded $_)
}

if (-not $files -or $files.Count -eq 0) {
  throw "No files found to upload."
}

Write-Host "Preparing $($files.Count) files..."

$hasExistingBranch = $true
$baseCommitSha = $null
$baseTreeSha = $null

try {
  $ref = Invoke-GitHubApi -Method "GET" -Uri "$ApiBase/git/ref/heads/$Branch"
  $baseCommitSha = $ref.object.sha
} catch {
  $hasExistingBranch = $false
  Write-Host "Branch '$Branch' was not found. A first commit will be created."
}

if (-not $hasExistingBranch) {
  Upload-FilesWithContentsApi -FilesToUpload $files
  exit 0
}

if ($hasExistingBranch) {
  $baseCommit = Invoke-GitHubApi -Method "GET" -Uri "$ApiBase/git/commits/$baseCommitSha"
  $baseTreeSha = $baseCommit.tree.sha
}

$treeItems = @()

foreach ($file in $files) {
  $path = Convert-ToGitPath $file.FullName
  Write-Host "Uploading blob: $path"

  $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
  $content = [Convert]::ToBase64String($bytes)

  $blob = Invoke-GitHubApi -Method "POST" -Uri "$ApiBase/git/blobs" -Body @{
    content = $content
    encoding = "base64"
  }

  $treeItems += @{
    path = $path
    mode = "100644"
    type = "blob"
    sha = $blob.sha
  }
}

Write-Host "Creating tree..."
$treeBody = @{
  tree = $treeItems
}

if ($baseTreeSha) {
  $treeBody.base_tree = $baseTreeSha
}

$newTree = Invoke-GitHubApi -Method "POST" -Uri "$ApiBase/git/trees" -Body $treeBody

Write-Host "Creating commit..."
$commitBody = @{
  message = $CommitMessage
  tree = $newTree.sha
}

if ($baseCommitSha) {
  $commitBody.parents = @($baseCommitSha)
}

$newCommit = Invoke-GitHubApi -Method "POST" -Uri "$ApiBase/git/commits" -Body $commitBody

if ($hasExistingBranch) {
  Write-Host "Updating branch..."
  Invoke-GitHubApi -Method "PATCH" -Uri "$ApiBase/git/refs/heads/$Branch" -Body @{
    sha = $newCommit.sha
    force = $true
  } | Out-Null
} else {
  Write-Host "Creating branch..."
  Invoke-GitHubApi -Method "POST" -Uri "$ApiBase/git/refs" -Body @{
    ref = "refs/heads/$Branch"
    sha = $newCommit.sha
  } | Out-Null
}

Write-Host ""
Write-Host "Done."
Write-Host "Commit: $($newCommit.sha)"
Write-Host "Repository: https://github.com/$Owner/$Repo"
