FROM node:18-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm build

FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /app

ENV NODE_ENV prod

COPY --from=builder /app ./

CMD ["pnpm", "start:prod"]

