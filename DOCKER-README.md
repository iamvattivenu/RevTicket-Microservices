# RevTickets Docker Setup

## Prerequisites
- Docker Desktop installed and running
- Maven installed (for building JARs)
- Node.js installed (for Angular build)

## Steps to Run with Docker

### 1. Build All Microservices
```bash
cd e:\RevTicket-MS-MWD\RevTicket
build-all.bat
```

### 2. Start All Services with Docker Compose
```bash
docker-compose up --build
```

This will start:
- MySQL (port 3306)
- MongoDB (port 27017)
- Consul (port 8500)
- API Gateway (port 8080)
- Auth Service (port 8081)
- Event Service (port 8087)
- Booking Service (port 8083)
- Notification Service (port 8084)
- Payment Service (port 8085)
- Review Service (port 8086)
- Angular Frontend (port 4200)

### 3. Access the Application
Open browser: **http://localhost:4200**

### 4. Stop All Services
```bash
docker-compose down
```

### 5. Stop and Remove Volumes (Clean Start)
```bash
docker-compose down -v
```

## Login Credentials
- Admin: admin@revtickets.com / Admin@123
- User: iamvattivenu@gmail.com / Venu@123

## Service URLs
- Frontend: http://localhost:4200
- API Gateway: http://localhost:8080
- Consul UI: http://localhost:8500

## Troubleshooting

### If services fail to start:
1. Check Docker Desktop is running
2. Ensure ports are not in use
3. Check logs: `docker-compose logs <service-name>`

### To rebuild specific service:
```bash
docker-compose up --build <service-name>
```

### To view logs:
```bash
docker-compose logs -f
```

## Notes
- First startup takes 5-10 minutes (building images)
- Subsequent startups are faster (using cached images)
- Data persists in Docker volumes
- All services auto-restart on failure
