# 1. Estágio de Build
FROM node:22-slim AS builder
WORKDIR /app

# Argumento para permitir a injeção da variável no momento do build
ARG PUBLIC_APP_URL
ENV PUBLIC_APP_URL=$PUBLIC_APP_URL

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

# 2. Estágio de Execução
FROM node:22-slim
WORKDIR /app

# Copia apenas os artefatos necessários
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/package.json package.json

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

# Comando para iniciar a aplicação
CMD [ "node", "build" ]