# Etap budowania
FROM node:22.1.0 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev  # Usuwamy devDependencies w produkcji

COPY . .
RUN npm run build

# Etap produkcyjny
FROM node:22.1.0 AS runner
WORKDIR /app

# Kopiujemy tylko potrzebne pliki
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000

CMD ["sh", "-c", "npm run start:prod"]