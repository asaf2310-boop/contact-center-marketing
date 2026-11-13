# Compose partner video: full system demo, then Pelecard package pitch at END
$root = "C:\Users\asaf2\Documents\s\contact-center-marketing\tmp-video-frames"
$src = "c:\Users\asaf2\Downloads\lkpjgf.mp4"
$outDir = "C:\Users\asaf2\Documents\s\contact-center-marketing\public\assets"
$work = Join-Path $root "compose"
New-Item -ItemType Directory -Force -Path $work | Out-Null

$productPng = Join-Path $root "overlays\slide_product.png"
$endPng = Join-Path $root "overlays\slide_end.png"
$voPackage = Join-Path $root "vo_clone\vo_package.wav"

$demo = Join-Path $work "demo.mp4"
$package = Join-Path $work "package.mp4"
$end = Join-Path $work "end.mp4"
$list = Join-Path $work "concat.txt"
$final = Join-Path $outDir "allincenter-pelecard-partners.mp4"
$finalDl = "c:\Users\asaf2\Downloads\allincenter-pelecard-partners.mp4"

function Run-FFmpeg([string[]]$a) {
  Write-Host ("ffmpeg " + ($a -join ' '))
  & ffmpeg.exe @a
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg exit $LASTEXITCODE" }
}

# Measure package VO duration
$voDur = [double]((ffprobe.exe -v error -show_entries format=duration -of default=nw=1:nk=1 $voPackage).Trim())
$pkgStill = [math]::Max(5.0, [math]::Round($voDur - 5.5, 2))
$endStill = [math]::Max(4.0, [math]::Round($voDur - $pkgStill, 2))
Write-Host "VO=$voDur packageStill=$pkgStill endStill=$endStill"

Write-Host "=== Full demo (unchanged narrative) ==="
Run-FFmpeg @(
  "-hide_banner","-loglevel","error","-y",
  "-i",$src,
  "-vf","scale=1440:900:force_original_aspect_ratio=decrease,pad=1440:900:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p",
  "-c:v","libx264","-preset","fast","-crf","18",
  "-c:a","aac","-ar","48000","-ac","2","-b:a","160k",
  $demo
)

Write-Host "=== Package pitch (product slide) ==="
# Split VO: first part under product slide
$voPkgPart = Join-Path $work "vo_pkg_part.wav"
Run-FFmpeg @(
  "-hide_banner","-loglevel","error","-y",
  "-i",$voPackage,"-t",$pkgStill.ToString([System.Globalization.CultureInfo]::InvariantCulture),
  "-c:a","pcm_s16le",$voPkgPart
)
Run-FFmpeg @(
  "-hide_banner","-loglevel","error","-y",
  "-loop","1","-t",$pkgStill.ToString([System.Globalization.CultureInfo]::InvariantCulture),
  "-i",$productPng,"-i",$voPkgPart,
  "-vf","fps=30,format=yuv420p",
  "-c:v","libx264","-tune","stillimage","-preset","fast","-crf","18",
  "-c:a","aac","-ar","48000","-ac","2","-b:a","160k","-shortest",
  $package
)

Write-Host "=== End CTA slide (rest of VO) ==="
$voEndPart = Join-Path $work "vo_end_part.wav"
$ss = $pkgStill.ToString([System.Globalization.CultureInfo]::InvariantCulture)
Run-FFmpeg @(
  "-hide_banner","-loglevel","error","-y",
  "-ss",$ss,"-i",$voPackage,
  "-c:a","pcm_s16le",$voEndPart
)
Run-FFmpeg @(
  "-hide_banner","-loglevel","error","-y",
  "-loop","1","-t",$endStill.ToString([System.Globalization.CultureInfo]::InvariantCulture),
  "-i",$endPng,"-i",$voEndPart,
  "-vf","fps=30,format=yuv420p",
  "-c:v","libx264","-tune","stillimage","-preset","fast","-crf","18",
  "-c:a","aac","-ar","48000","-ac","2","-b:a","160k","-shortest",
  $end
)

Write-Host "=== Concat ==="
@(
  "file '$($demo -replace '\\','/')'",
  "file '$($package -replace '\\','/')'",
  "file '$($end -replace '\\','/')'"
) | Set-Content -Path $list -Encoding ASCII

Run-FFmpeg @(
  "-hide_banner","-loglevel","error","-y",
  "-f","concat","-safe","0","-i",$list,
  "-c:v","libx264","-preset","fast","-crf","18",
  "-c:a","aac","-ar","48000","-ac","2","-movflags","+faststart",
  $final
)

Copy-Item -LiteralPath $final -Destination $finalDl -Force
ffprobe.exe -v error -show_entries format=duration,size -of default=nw=1 $final
Write-Host "DONE"
Write-Host $final
Write-Host $finalDl
