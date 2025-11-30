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
