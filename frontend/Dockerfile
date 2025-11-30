# --- STAGE 1 : Build Vite (React) ---
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Le build final est dans : /app/dist
FROM nginx:latest

# Copier la configuration nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Copier le site (build Vite)
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
