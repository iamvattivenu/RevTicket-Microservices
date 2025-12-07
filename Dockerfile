# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY revtickets-frontend/package*.json ./
RUN npm install -g @angular/cli@18 && npm install --legacy-peer-deps
COPY revtickets-frontend/ ./
RUN ng build --configuration production --optimization=false

# Stage 2: Build Backend
FROM maven:3.8.5-openjdk-17 AS backend-build
WORKDIR /app/backend
COPY revtickets-backend/pom.xml ./
COPY revtickets-backend/src ./src
RUN mvn clean package -DskipTests

# Stage 3: Final Image
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Install nginx
RUN apk add --no-cache nginx

# Copy backend JAR
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Copy frontend build to nginx
COPY --from=frontend-build /app/frontend/dist/rev-ticket/browser /usr/share/nginx/html

# Create nginx config
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://localhost:8080/api/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
    } \
}' > /etc/nginx/http.d/default.conf

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'nginx' >> /app/start.sh && \
    echo 'java -jar /app/app.jar' >> /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 80 8080

CMD ["/app/start.sh"]
