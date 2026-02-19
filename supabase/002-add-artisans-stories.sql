-- ============================================
-- Phase 1: テーブル作成
-- ============================================

-- artisans（職人）テーブル
create table if not exists artisans (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  craft_id      uuid not null references crafts(id) on delete cascade,
  generation    text,
  biography     text,
  philosophy    text,
  quote         text,
  workshop_name text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- stories（エピソード）テーブル
create table if not exists stories (
  id          uuid primary key default gen_random_uuid(),
  craft_id    uuid not null references crafts(id) on delete cascade,
  artisan_id  uuid references artisans(id) on delete set null,
  title       text not null,
  content     text not null,
  story_type  text not null check (story_type in (
    'technique', 'history_turning_point', 'artisan_voice', 'cultural_significance'
  )),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- RLS 設定
alter table artisans enable row level security;
alter table stories enable row level security;

create policy "Allow anon read artisans" on artisans for select to anon using (true);
create policy "Allow anon insert artisans" on artisans for insert to anon with check (true);
create policy "Allow anon update artisans" on artisans for update to anon using (true) with check (true);

create policy "Allow anon read stories" on stories for select to anon using (true);
create policy "Allow anon insert stories" on stories for insert to anon with check (true);
create policy "Allow anon update stories" on stories for update to anon using (true) with check (true);

-- ============================================
-- Phase 2: 伊賀組紐のナラティブデータ投入
-- ============================================

-- 職人データ
insert into artisans (id, name, craft_id, generation, biography, philosophy, quote, workshop_name) values
(
  'a0000001-0000-0000-0000-000000000001',
  '増井萌',
  'c324092d-e9a4-4875-aeeb-43b19f787432',
  '3代目',
  '東京の大学卒業後、名古屋でコンピュータ関係のサラリーマンとして働く。30歳で帰郷し家業の組紐製造を継ぐ。まったく初めての人たちに仕事を教えるために、自分自身も懸命に技術を磨いた。車で奈良や滋賀まで走り回り、組子（内職の組紐職人）を探し続けた。',
  '帯締めだけが一人歩きしてはダメだ（父の教え）。着物全体の調和の中で組紐が活きる。',
  '父は自転車で回れる範囲の組子さんにしか仕事を頼めなかったが、私は車に乗れたので遠く奈良や滋賀にまで走り回った',
  null
),
(
  'a0000001-0000-0000-0000-000000000002',
  '廣澤徳三郎',
  'c324092d-e9a4-4875-aeeb-43b19f787432',
  '初代（伊賀組紐の祖）',
  '明治35年(1902年)、東京で9年間にわたり江戸組紐の技術を習得した後、故郷の伊賀に戻り組紐工場を開設。伊賀における近代組紐産業の礎を築いた人物。',
  '伊賀の地に組紐産業を根付かせ、地域の産業として発展させる。',
  null,
  '組紐工房 廣澤徳三郎'
);

-- エピソードデータ
insert into stories (craft_id, artisan_id, title, content, story_type) values
(
  'c324092d-e9a4-4875-aeeb-43b19f787432',
  null,
  '廃刀令から和装文化へ - 組紐の転換点',
  '明治時代、廃刀令で刀剣の飾り紐としての需要が消滅し、組紐産業は絶望の淵に。しかし江戸の深川芸者が亀戸天神の太鼓橋を渡る際、組紐製の帯締めで背中高く結んだ帯が評判に。これがお太鼓結びの始まりとなり、組紐は和装文化の必需品として復活を遂げた。',
  'history_turning_point'
),
(
  'c324092d-e9a4-4875-aeeb-43b19f787432',
  null,
  '70手の糸を操る - 高台の技',
  '伊賀組紐の最高峰である高台では、ベテラン職人が70手近くの重りを操り、複雑な柄を組み出す。正座で組台に向かい、シャッシャッと糸が擦れる音だけが工房に響く。一本の組紐に込められるのは、職人の無心の時間と、何百年も受け継がれた技の集積だ。',
  'technique'
),
(
  'c324092d-e9a4-4875-aeeb-43b19f787432',
  null,
  '組台は嫁入り道具 - 伊賀の家族制度',
  '伊賀では、組紐の高い技術を持つ娘は重宝され、嫁入りの条件になっていた。組台は大事な嫁入り道具の一つ。正座で行う組紐作りは、娘のしつけとして家族制度の中で受け継がれた。忍者の里として秘密を厳守する地域性も、門外不出の柄を守る組紐文化とマッチした。',
  'cultural_significance'
),
(
  'c324092d-e9a4-4875-aeeb-43b19f787432',
  'a0000001-0000-0000-0000-000000000001',
  '3000人から1000人へ - 職人を守る戦い',
  '「まったく初めての人たちに仕事を教えるために、自分自身も懸命に技術を磨いた」と語る増井さん。かつて伊賀地方に3000人以上いた職人も、外国製品に押され三分の一に激減。それでも伝統を守るため、車で奈良や滋賀まで走り回り組子を探し続けた。',
  'artisan_voice'
),
(
  'c324092d-e9a4-4875-aeeb-43b19f787432',
  null,
  '日本中の帯締めの9割が伊賀から',
  '手組紐の全国生産高の約90%を占める伊賀。日本中の和装を支える、知られざる産地。大阪と名古屋の中間に位置し、養蚕が盛んで絹糸の入手が容易だったこと、京都に近く和装の本場との繋がりがあったこと。様々な条件が重なり、この地に日本一の組紐産地が生まれた。',
  'cultural_significance'
);
