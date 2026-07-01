# syntax=docker/dockerfile:1

FROM hugomods/hugo:exts-0.154.5 AS build
WORKDIR /src
COPY . .
RUN hugo --minify --gc

FROM nginxinc/nginx-unprivileged:1.27-alpine-slim
COPY --from=build /src/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget --quiet --spider http://127.0.0.1:8080/ || exit 1
