# Next.js + WordPress REST API 開発環境

## 環境

### Node

v16.x

### PHP

v7.4.x

### MySQL

v8.0.x

## コマンド

### 初期セットアップ

`npm run setup`

### Docker

#### 起動

`docker-compose up`

#### DB データダンプ

`npm run dump`

### Composer

#### セットアップ

`npm run composer-setup`

#### インストール

`npm run composer-install`

#### ライブラリ追加

`npm run composer-require`

## ファイル構成

.
├── .composer
├── .wp WordPress 本体（wp-config.php と.htaccess）
├── plugins WordPress のプラグイン
├── theme WordPress のテーマ
├── blocks Gutenberg カスタムブロックの src
├── components
├── layouts
├── libs
├── manuscripts
├── pages
├── utils
├── public
├── styles
├── types
└── scripts セットアップ用のシェル

## WordPress

初期ログインアイパス
user: root
pass: root
