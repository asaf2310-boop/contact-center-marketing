-- מודול הסכמים דיגיטליים — AllInCenter
-- הריצו ב-Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists digital_agreements (
  id uuid primary key default gen_random_uuid(),
  access_token text not null unique default encode(gen_random_bytes(24), 'hex'),
  status text not null default 'draft'
    check (status in ('draft', 'sent', 'viewed', 'signed', 'cancelled')),

  -- פרטי עסק הלקוח
  client_business_name text not null,
  client_contact_name text,
  client_email text,
  client_phone text,
  client_address text,
  client_id_number text,

  -- פרטי שירות
  service_title text not null default 'מערכת ניהול תורים וקורסים',
  service_description text,
  service_included text,
  service_excluded text,

  -- עלויות
  setup_cost numeric(10, 2) not null default 200,
  monthly_cost numeric(10, 2) not null default 50,
  payment_terms text,
  delivery_timeline text,

  -- תבנית מותאמת (אופציונלי)
  custom_sections jsonb,

  -- חתימה
  terms_approved boolean not null default false,
  signature_type text check (signature_type is null or signature_type in ('draw', 'type')),
  signature_image text,
  signature_name text,
  signer_full_name text,
  signer_email text,
  signer_phone text,
  signed_ip text,
  signed_at timestamptz,
  user_agent text,

  -- PDF
  pdf_base64 text,

  -- מעקב
  sent_at timestamptz,
  viewed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  admin_notes text
);

create index if not exists idx_digital_agreements_status on digital_agreements(status);
create index if not exists idx_digital_agreements_token on digital_agreements(access_token);
create index if not exists idx_digital_agreements_created on digital_agreements(created_at desc);

create or replace function digital_agreements_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_digital_agreements_updated on digital_agreements;
create trigger trg_digital_agreements_updated
  before update on digital_agreements
  for each row execute function digital_agreements_set_updated_at();

alter table digital_agreements enable row level security;

-- אנונימי: קריאה לפי token ועדכון סטטוס viewed/sign בלבד דרך API (service role)
drop policy if exists "service_all_digital_agreements" on digital_agreements;
create policy "service_all_digital_agreements"
  on digital_agreements for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
