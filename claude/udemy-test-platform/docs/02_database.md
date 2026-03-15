# 02 データベース設計・Supabase セットアップ

## 概要

Supabase 上に `courses` テーブルと `videos` テーブルを作成し、RLS（Row Level Security）を設定する。

## Todo

- [ ] Supabase プロジェクトを作成する（[database.new](https://database.new)）
- [ ] `courses` テーブルを作成する
  ```sql
  CREATE TABLE courses (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title       text NOT NULL,
    description text,
    thumbnail_url text,
    created_at  timestamp WITH TIME ZONE DEFAULT now()
  );
  ```
- [ ] `videos` テーブルを作成する
  ```sql
  CREATE TABLE videos (
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id  uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title      text NOT NULL,
    youtube_id text NOT NULL,
    "order"    integer NOT NULL DEFAULT 0,
    created_at timestamp WITH TIME ZONE DEFAULT now()
  );
  ```
- [ ] RLS を有効化する
  ```sql
  ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
  ALTER TABLE videos  ENABLE ROW LEVEL SECURITY;
  ```
- [ ] 匿名読み取りポリシーを設定する
  ```sql
  CREATE POLICY "Public read" ON courses FOR SELECT USING (true);
  CREATE POLICY "Public read" ON videos  FOR SELECT USING (true);
  ```
- [ ] サンプルデータを投入してデータ取得を確認する

## テーブル定義

### `courses`

| カラム | 型 | 説明 |
|--------|----|------|
| id | uuid (PK) | コースID |
| title | text | コースタイトル |
| description | text | コース説明文 |
| thumbnail_url | text | サムネイル画像URL |
| created_at | timestamp | 作成日時 |

### `videos`

| カラム | 型 | 説明 |
|--------|----|------|
| id | uuid (PK) | 動画ID |
| course_id | uuid (FK → courses.id) | 所属コースID |
| title | text | 動画タイトル |
| youtube_id | text | YouTube動画ID |
| order | integer | コース内の表示順 |
| created_at | timestamp | 作成日時 |

## 備考

- 書き込み（INSERT / UPDATE / DELETE）のポリシーは Phase 4（管理画面）まで不要
- `order` は予約語のためクエリ時にダブルクォートで囲む
