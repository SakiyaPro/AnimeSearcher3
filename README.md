# AnimeSearcher3 GitHub README

## 概要
アプリケーション名は「あにめ大革命」と命名しました。

あにめ大革命は、「見やすい」「使いやすい」「レビューしやすい」をコンセプトに制作しているアニメレビューサイトです。

レスポンシブデザインにも対応しているので下記URLから御覧ください。

https://anime-wo-kataru.com

![あにめ大革命スクリーンショット](./Desktop Screenshot 2022.05.26 - 11.38.32.01.png)

## 使用技術
・Windows

    ○ Ubuntu 20.04 (Linuxディストリビューション)
    
・Python 3.9

    ○ Django 3.2
    
・JavaScript

    ○ Next.js 12.0.4
    
・ESLint 7.32.0

・MySQL 8系

・Docker 4.2.0

・AWS

    ○ VPC
    ○ ECS(Fargate)
    ○ RDS
    ○ ELB
    ○ Route53
 
・Nginx

・外部API

    ○ RestAPI
    ○ GraphQL

## AWS(インフラ)構成図

![AWS構成図](./Desktop Screenshot 2022.05.26 - 11.29.36.70.png)

## 機能一覧

・ユーザー登録 / ログイン機能

・マイプロフィール機能

・アニメの探索(検索)機能

    ○ アニメタイトル
    ○ ジャンル
    ○ 声優名
    ○ スタッフ / 制作会社
    
・応援したいアニメへのいいね機能

・評価したいアニメへのレビュー機能

    ○ レビュー評価(星)
    ○ レビューコメント
    
・ジャンルタグの追加 / 削除機能


(5/25移行時点 実装予定)

・ランキング機能(日/週/月別)

    ○ レビュー数
    ○ いいね数
    ○ 視聴者数
    ○ 上記３つのジャンル別ランキング
  
・レビューユーザーの年齢層・性別分布


# データベースモデル一覧

・アニメ関連モデルの一覧

    ○ アニメ情報(タイトル・制作年度など)
      ● アニメのシリーズ
      ● キャスト(声優)
      ● スタッフ(制作会社など)
      ● パーソン(キャスト及びスタッフのパーソンデータ)
      ● 登場キャラクター
      ● エピソード

・ユーザー関連モデルの一覧

    ○ ユーザー情報(email, パスワードなど)
      ● プロフィール(自己紹介文やイメージアイコンなど)
      ● レビューしたアニメの情報

## テストの実装

なし
