# Fresh project

[![deno check](https://github.com/YutaGoto/splatoon3-shellout-titles/actions/workflows/check.yml/badge.svg)](https://github.com/YutaGoto/splatoon3-shellout-titles/actions/workflows/check.yml)
[![Deploy](https://github.com/YutaGoto/splatoon3-shellout-titles/actions/workflows/deploy.yml/badge.svg)](https://github.com/YutaGoto/splatoon3-shellout-titles/actions/workflows/deploy.yml)

Your new Fresh project is ready to go. You can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task dev
```

This will watch the project directory and restart as necessary.

### Docker

Fresh + Vite の構成を維持したまま、開発用 (HMR) と本番用 (build + start) の両方を
`docker compose` で実行できます。

#### Development (hot reload)

```sh
docker compose up --build app-dev
```

- Access: http://localhost:5173
- Source code is bind-mounted, so edits on host are reflected in the container.
- `.env` is injected through `env_file` in compose (optional).

#### Production-like run (build + start)

```sh
docker compose --profile prod up --build app-prod
```

- Access: http://localhost:8000
- Startup flow: `deno task build` -> `deno task start`

#### Stop containers

```sh
docker compose down
```

#### Notes

- First build can take longer because Deno/npm dependencies are cached.
- Rebuilds are typically faster after cache is populated.
- If port conflicts occur, change `ports` or `PORT` in `docker-compose.yml`.
- If file permission issues occur on Linux bind mounts, rerun with proper file ownership/permissions.
