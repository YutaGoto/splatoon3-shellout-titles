FROM denoland/deno:2.8.3 AS base
WORKDIR /app

# Cache dependencies in a stable layer.
COPY deno.json deno.lock ./
COPY main.ts ./
RUN deno cache main.ts

# Bring in source after dependency cache layer.
COPY . .

FROM base AS dev
EXPOSE 5173
CMD ["deno", "task", "dev:docker"]

FROM base AS prod-builder
RUN deno task build

FROM denoland/deno:2.8.3 AS prod-runner
WORKDIR /app
ENV PORT=8000

COPY --from=prod-builder /app /app

EXPOSE 8000
CMD ["deno", "task", "start"]
