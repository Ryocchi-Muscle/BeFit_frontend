![newiphonemockup](https://github.com/Ryocchi-Muscle/fitapp-api/assets/140929302/bb068a5d-ae34-4b55-8644-4bcdb8619955)
[![Ruby](https://img.shields.io/badge/Ruby-v3.2.2-CC342D?logo=Ruby&logoColor=CC342D)](https://www.ruby-lang.org/ja/news/2023/03/30/ruby-3-2-2-released)[![Rails](https://img.shields.io/badge/Rails-v7.0.7.2-CC0000?logo=Ruby-on-Rails&logoColor=CC0000)](https://rubyonrails.org/2023/3/13/Rails-7-0-4-3-and-6-1-7-3-have-been-released)[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.2-007ACC?logo=TypeScript&logoColor=007ACC)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html)[![React](https://img.shields.io/badge/React-v18.2.0-61DAFB?logo=React&logoColor=61DAFB)](https://react.dev/blog/2022/03/29/react-v18#whats-new-in-react-18)[![Next.js](https://img.shields.io/badge/Next.js-v14.2.3-000000?logo=Next.js&logoColor=000000)](https://nextjs.org/blog/next-13-2)[![CI/CD](https://github.com/keynyaan/hayabusatrip-frontend/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/keynyaan/hayabusatrip-frontend/actions/workflows/ci.yml)[![Thanks](https://img.shields.io/badge/Thank%20you-for%20visiting-00aab9)](https://www.befitvercel.com/)


## ■ サービス名
<h1><a href="https://www.befitvercel.com/">Be Fit</a></h1>

## ■ サービス概要
筋トレ初心者向けのサポートアプリです。
<br>
具体的には、<br>
 * ユーザーの性別、トレーンング頻度にあったトレーニングプログラムを作成できる
 * 週ごとのトレーニングの成長を棒グラフで確認することができる
 * メニューの解説機能を使用して、正しいフォームを学ぶことができる

## ■ このサービスを作成した理由
#### ・背景：多くの人にフィットネスの楽しさを伝えたい
筋トレを通じて、**自己肯定感が高まりました。** その経験から、<br>
多くの人にフィットネスの楽しさを伝えたいと考えています。<br>
しかし、トレーニング初心者はジムでの知識が不足しており、何をすれば良いのかわからないことが多いです。<br>
そこで、私の知識と経験を活かし、初心者が効率的なトレーニングを行い、身体の変化を実感できるサービスを提供したいと思い、このサービスを開発しました。

## ■ ユーザー層について

対象者：筋トレ初心者

## ■ サービスの利用イメージ
1.性別、1週間のトレーニング頻度、プログラム期間を選択します。<br>
2.1.の選択内容によって、オリジナルのトレーニングプログラムメニューが作成されます。<br>
3.作成されたプログラムのメニューのセットの重量と回数を記録します。<br>
4.週ごとの総重量が記録されるため、週ごとのトレーニング強度の進捗を確認することができます。<br>

## ■ メイン機能の使い方

<table>
  <tr>
    <th style="text-align: center">プログラム作成</th>
    <th style="text-align: center">メニュー記録</th>
    <th style="text-align: center">メニュー編集</th>
  </tr>
  <tr>
    <td>
      <img src="assets/program.gif" alt="トレーニングプログラム作成">
      まずは、プログラム作成ボタンを押して、各情報を入力後に作成ボタンを押す。
    </td>
    <td>
      <img src="assets/menu.gif" alt="メニュー記録">
      作成されたプログラムのメニューを行い、記録を入力する。
    </td>
    <td>
      <img src="assets/menu_edit.gif" alt="メニュー編集">
      まずは、プログラム作成ボタンを押して、各旅行情報を記入後に作成ボタンを押す。
    </td>
  </tr>
  <tr>
    <th style="text-align: center">記録表示</th>
    <th style="text-align: center">カレンダー機能</th>
    <th style="text-align: center">解説機能</th>
  </tr>
  <tr>
    <td>
      <img src="assets/record.gif" alt="記録表示">
      1週間のトレーニングボリュームを棒グラフで表示。<br>最大8週間分の記録を確認することができ、トレーニングの成長を可視化できる。
    </td>
    <td>
      <img src="assets/calendar.gif" alt="カレンダー機能">
      カレンダーから過去の記録を確認することができる。
    </td>
    <td>
      <img src="assets/trainingguide.gif" alt="解説機能">
      初心者でも理解しやすく、対象の筋肉の筋繊維図や、動画を見ながら学ぶことができる。
    </td>
  </tr>
  <tr>
</table>


## ■ サービスの差別化ポイント

**① プログラム内容のシンプルさ。**<br>
他の筋トレアプリにあるような多数のメニューを提示することなく、<br>
筋トレ歴5年の私の経験と知識をもとに、「初心者が効率的に身体の変化を感じられるためのプログラム」を
念頭に自作でプログラムメニューを作成しました。<br>
<br>
**②モチベーションの向上維持。**<br>
週ごとのトレーニング強度（重量 × 回数 = 総重量）を記録し、棒グラフで表示します。これにより、前週よりも強度が上がったか下がったかを可視化し、ユーザーのモチベーションを向上・維持することを狙っています。<br>
<br>
**③動画付きトレーニング解説機能**<br>
トレーニングを行う上で、トレーニンフォーム、対象筋肉を理解してトレーニングを行うことが大切です。<br>
そのため、メニューの対象筋肉を図解表示し、おすすめのYouTube動画も掲載しています。<br>

## ■ 機能一覧<br>
**機能**<br>
・Googleアカウントを利用したユーザー登録 / ログイン機能<br>
・退会機能<br>
・プログラムの取得 / 作成 / 削除機能<br>
・トレーニングメニューの取得 / 作成 / 更新 / 削除機能<br>
・トレーニング記録の表示機能<br>
・カレンダー機能<br>
・トレーニング解説ページ表示機能<br>
<br>

**画面**<br>
・トースト表示<br>
・ローディング画面<br>
・モーダル画面<br>
・ダイアログ画面<br>
・レスポンシブデザイン<br>

## ■ 使用技術

| カテゴリ       | 技術                                                                                  |
| -------------- | ------------------------------------------------------------------------------------- |
| フロントエンド | TypeScript 5.3.3 / React 18.2 / Next.js 14.2.3                                   |
| バックエンド   | Ruby 3.2.2 / Ruby on Rails 7.0.8 （APIモード）                                         |
| データベース   | MySQL                                                                            |
| 認証           | NextAuth.js                                                                           |
| CI/CD           | GitHubActions                                                                           |
| インフラ       | Vercel / Heroku                                                                       |                       |
| その他         | SWR / shadcn/ui / Radix UI/ GoogleAnalitycs / tailwind CSS



## ■ER図
```mermaid
erDiagram
users ||--o{ program_bundles : "has many"
users ||--o{ training_days : "has many"
program_bundles ||--o{ daily_programs : "has many"
training_days ||--o{ training_menus : "has many"
daily_programs ||--o{ training_menus : "has many"
training_menus ||--o{ training_sets : "has many"

users {
  bigint id PK
  string uid
  string name
  string provider
  datetime created_at
  datetime updated_at
}

program_bundles {
  bigint id PK
  bigint user_id FK
  string gender
  string frequency
  datetime created_at
  datetime updated_at
  integer duration
}

daily_programs {
  bigint id PK
  bigint program_bundle_id FK
  json details
  datetime created_at
  datetime updated_at
  integer week
  boolean completed
  integer day
  date date
}

training_days {
  bigint id PK
  bigint user_id FK
  date date
  datetime created_at
  datetime updated_at
}

training_menus {
  bigint id PK
  bigint training_day_id FK
  bigint daily_program_id FK
  string body_part
  string exercise_name
  datetime created_at
  datetime updated_at
  string set_info
  string other
}

training_sets {
  bigint id PK
  bigint training_menu_id FK
  integer set_number
  integer weight
  integer reps
  boolean completed
  datetime created_at
  datetime updated_at
}
