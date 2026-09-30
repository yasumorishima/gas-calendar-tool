# CLAUDE.md

Google Apps Script のWebアプリ（カレンダー一括登録ツール）。ユーザーへの応答は日本語で。

## 構成
- `Code.gs` … サーバー側（テンプレート保存は UserProperties の `savedEventNames`、カレンダー登録は `addEventsToCalendarDirectly`）
- `Index.html` … 画面。①予定の内容 → ②日付を選ぶ → ③カレンダーに登録 の3ステップ構成
  - 「よく使う予定」= テンプレート。保存してもカレンダーには登録されない（この区別を画面上で崩さないこと）
  - スマホ（≤1024px）は `!important` 付きの大きいサイズ指定があるので、新しい要素を足したらモバイル用の指定も追加する

## デプロイ（自動）
- `main` に `Code.gs` / `Index.html` / `appsscript.json` の変更が入ると `.github/workflows/deploy-gas.yml` が
  `clasp push -f` → `clasp update-deployment` を実行し、既存URLのまま新バージョンになる
- Webアプリ URL: https://script.google.com/macros/s/AKfycbxMSGHa3--q4Q6Iw6aJNSfbJ0XvJmUpOt_8wfYduVGP69NLd6Mh-Fo7SkemPobMQSo/exec
- スクリプトID: `.clasp.json`（GAS上のプロジェクト名は「GASスケジュール作成…」）/ デプロイID: ワークフロー内 `DEPLOYMENT_ID`
- 認証: リポジトリ Secret `CLASPRC_JSON`（`~/.clasprc.json` の内容。refresh_token があれば足りる）
- 「新しいデプロイ」は作らない（URLが変わる）。必ず既存デプロイを更新する
- ユーザーは「修正したらマージしてURLまで反映」まで期待している。修正 → PR → マージ → Actions 成功確認 までやる

## 認証が切れたとき（クラウドから再ログイン）
1. `npm i -g @google/clasp` → `clasp login --no-localhost` をバックグラウンドで起動し、表示された認可URLをコードブロックで渡す
2. ユーザーが許可すると localhost のエラー画面になる。そのURLを「︙→共有→リンクをコピー」(Android) /「共有→コピー」(iPhone) で貼ってもらう
3. 生成された `~/.clasprc.json` の内容を Secret `CLASPRC_JSON` に登録してもらう（Secret はこちらから設定できない）

## 動作確認
- `google.script.run` をモックした HTML を Playwright（`/opt/pw-browsers` の Chromium）で開き、スマホ幅（430px）でスクリーンショット確認する
