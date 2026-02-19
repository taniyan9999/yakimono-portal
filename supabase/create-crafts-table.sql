-- crafts テーブル作成
-- Supabase Dashboard → SQL Editor で実行してください

create table if not exists crafts (
  id             uuid primary key default gen_random_uuid(),
  name           text not null unique,
  name_kana      text not null,
  prefecture     text not null,
  city           text not null,
  category       text not null,
  description    text not null,
  history        text not null,
  technique      text not null,
  designated_year integer,
  official_url   text,
  image_url      text,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- RLS（Row Level Security）を有効化し、全員が読み取り可能に
alter table crafts enable row level security;

create policy "Allow public read access"
  on crafts for select
  to anon
  using (true);

-- サービスロール（import script）からの全操作を許可
create policy "Allow service role full access"
  on crafts for all
  to authenticated
  using (true);
