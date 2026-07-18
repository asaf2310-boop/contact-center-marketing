-- הריצו פעם אחת ב-Supabase SQL Editor לפרויקט של אתר השיווק / הסכמי עבודה

create extension if not exists "pgcrypto";

create table if not exists work_agreements (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  company_name text,
  client_email text not null,
  client_phone text not null,
  client_id_number text,
  project_description text,
  agreement_accepted boolean not null default false,
  signature_name text not null,
  payment_confirmed boolean not null default false,
  payment_method text not null default 'bit',
  setup_amount numeric(10, 2) not null default 200,
  maintenance_amount numeric(10, 2) not null default 50,
  total_amount numeric(10, 2) not null default 250,
  agreement_text text,
  signed_at timestamptz not null default now(),
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_work_agreements_signed_at on work_agreements(signed_at desc);
create index if not exists idx_work_agreements_client_email on work_agreements(client_email);

alter table work_agreements enable row level security;

-- אפליקציית לקוח: הוספה בלבד (קריאה דרך אדמין / service role)
drop policy if exists "anon_insert_work_agreements" on work_agreements;
create policy "anon_insert_work_agreements"
  on work_agreements for insert
  with check (true);

drop policy if exists "service_read_work_agreements" on work_agreements;
create policy "service_read_work_agreements"
  on work_agreements for select
  using (auth.role() = 'service_role');
