# Estágio de build
FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio de execução
FROM node:22-slim
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# O Cloud Run expõe a porta 8080 por padrão
ENV PORT=8080
EXPOSE 8080

CMD ["node", "build"]