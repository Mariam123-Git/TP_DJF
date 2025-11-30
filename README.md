# 🚀 Fullstack Application — React + Spring Boot + MySQL + Nginx + Docker

Ce projet est une application fullstack complète comprenant :

- **Frontend :** React + Vite
- **Backend :** Spring Boot (Java 17)
- **Base de données :** MySQL 8
- **Reverse Proxy :** Nginx
- **Conteneurisation :** Docker & Docker Compose

L’application est entièrement dockerisée et prête pour le déploiement en production.



# ✅ **3. Lancement du projet avec Docker**

```markdown
## 🐳 Lancer toute l’application

```bash
docker compose up --build
```


# ✅ **4. docker-compose.yml**

```markdown
## 🧱 docker-compose.yml

```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: dosi_mysql
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: dosi_db
      MYSQL_USER: user
      MYSQL_PASSWORD: user
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - dosi_network

  backend:
    build: ./backend
    container_name: dosi_backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/dosi_db?useSSL=false&allowPublicKeyRetrieval=true
      SPRING_DATASOURCE_USERNAME: user
      SPRING_DATASOURCE_PASSWORD: user
    depends_on:
      - mysql
    networks:
      - dosi_network
    volumes:
      - ./backend/logs:/app/logs

  frontend:
    build: ./frontend
    container_name: dosi_frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - dosi_network

volumes:
  mysql_data:

networks:
  dosi_network:
    driver: bridge
```

---

# ✅ **5. Dockerfile Frontend (React + Nginx)**

```markdown
## 🎨 Frontend – Dockerfile

```dockerfile
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

```

---

# ✅ **6. nginx.conf**

```markdown
## ⚙️ nginx.conf

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
  location /api/ {
          proxy_pass http://dosi_backend:8080;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto $scheme;
      }
    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}

```

---

# ✅ **7. Dockerfile Backend**

```markdown
## 🔧 Backend — Dockerfile Spring Boot

```dockerfile
FROM gradle:9.2.1-jdk21 AS build
WORKDIR /app
COPY --chown=gradle:gradle . .
RUN ./gradlew clean build -x test

FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

```

---

# ✅ **8. Script SQL**

```markdown
## 🗄️ Base de données – init.sql

```sql
-- init.sql
CREATE DATABASE IF NOT EXISTS dosi_db;
USE dosi_db;

CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
    );

-- Insertion
INSERT IGNORE INTO user (nom, prenom, email) VALUES
('Dupont', 'Jean', 'jean.dupont@email.com'),
('Martin', 'Marie', 'marie.martin@email.com'),
('Bernard', 'Pierre', 'pierre.bernard@email.com');

```

