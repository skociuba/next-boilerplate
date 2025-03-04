# 1. Budowanie aplikacji
FROM node:22.1.0 as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Uruchamianie w trybie produkcji
FROM node:22.1.0 as runner
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3000
CMD ["npm", "run", "start"]