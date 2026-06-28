## Plan: Fresh App Docker Enablement

Fresh + Vite構成の現状を維持しつつ、開発用（ホットリロード）と本番用（build +
start）の両方をDockerで実行できるようにする。最小変更で、まずは
`docker compose up`
で開発、`docker compose --profile prod up`（または同等）で本番確認できる構成にする。

**Steps**

1. 現行ランタイム要件を明文化する
2. 開発用コンテナ設計（_parallel with step 3_）
3. 本番用コンテナ設計（_parallel with step 2_）
4. Docker build最適化（依存キャッシュと不要ファイル除外）（_depends on 2,3_）
5. compose定義を追加し、dev/prodの起動導線を統一（_depends on 2,3,4_）
6. READMEにDocker手順を追記し、ローカル実行との差分を明示（_depends on 5_）
7. 動作検証（dev hot reload / prod serving / 静的ファイル配信）（_depends on
   6_）

**Phase Details**

1. Phase 1: Requirements & Runtime

- `deno.json` の task (`dev`, `build`, `start`)
  をDocker内実行コマンドとして再利用する方針にする。
- 開発時はViteサーバーを外部公開できるよう `--host 0.0.0.0`
  を付与する（必要なら専用task追加）。
- 本番時は `_fresh/server.js` を `deno serve`
  で起動し、ポートを環境変数で制御可能にする。

2. Phase 2: Container Artifacts

- `Dockerfile` をマルチステージ化し、base/dev/prod-runnerを分離する。
- 依存解決は `deno cache` を使ってビルドキャッシュが効く層に固定する。
- `docker-compose.yml` に `app-dev` サービスを定義し、ソースをbind
  mount、適切なポートを公開する。
- 必要なら `docker-compose.yml` に `app-prod` サービス（build済み成果物起動）を
  profile 付きで追加する。
- `.dockerignore` を作成し、`.git`, `node_modules`, `_fresh`, `dist`, `build`
  を除外してビルドを軽量化する。

3. Phase 3: Runtime Behavior

- 開発用コマンドは `deno task dev`（または
  `deno task dev:docker`）で統一し、HMRがホストから見えることを保証する。
- 本番用は `deno task build` 後に `deno task start` を実行する構成にする。
- `.env` はcomposeで `env_file` を使って注入し、`main.ts` の
  dotenv読み込み方針と整合させる。

4. Phase 4: Docs & Validation

- READMEに `docker compose up`（dev）と本番起動手順を追加する。
- 期待ポート、停止方法、初回ビルド時間、よくある失敗（ポート競合・権限）を短く追記する。

**Relevant files**

- `/home/yougo/projects/splatoon3-shellout-titles/deno.json` —
  task定義の再利用、必要ならDocker用task追加（例: host公開版dev task）
- `/home/yougo/projects/splatoon3-shellout-titles/README.md` —
  Docker利用手順と運用ルールの追記
- `/home/yougo/projects/splatoon3-shellout-titles/main.ts` —
  dotenv読込方針との整合確認（原則変更不要）
- `/home/yougo/projects/splatoon3-shellout-titles/Dockerfile` —
  マルチステージ定義を新規追加
- `/home/yougo/projects/splatoon3-shellout-titles/docker-compose.yml` —
  dev/prodサービス定義を新規追加
- `/home/yougo/projects/splatoon3-shellout-titles/.dockerignore` —
  ビルドコンテキスト最適化を新規追加

**Verification**

1. `docker compose up --build app-dev`
   で開発サーバーが起動し、ブラウザからアクセスできることを確認する。
2. ソース変更時にHMR/再読み込みが反映されることを確認する。
3. `docker compose --profile prod up --build app-prod`（または別composeファイル）で本番起動を確認する。
4. 静的アセット（`static/titleImages`）とルーティング（`/`,
   `/_404`）が崩れていないことを確認する。
5. コンテナ再ビルド時、依存キャッシュが効き、2回目以降のビルド時間が短縮されることを確認する。

**Decisions**

- 対象範囲: 開発環境も含むDocker化（ユーザー回答）
- 既存のFresh/Vite構成を維持し、task中心で運用する
- まず1リポジトリ内完結（外部reverse proxyやKubernetes対応は対象外）

**Further Considerations**

1. dev/prodを1つのcomposeにprofileで同居させるか、`docker-compose.dev.yml` /
   `docker-compose.prod.yml` に分割するか
2. 本番イメージを最小化するために実行ステージをdistroless相当に寄せるか（初期は公式Denoイメージ優先）
3. CIでDocker build確認を追加するか（`deno check`に加えて品質ゲート化）
