# RevTickets Backend

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

### Database Setup
1. Install MySQL and create a database:
```sql
CREATE DATABASE revtickets;
```

2. Update `src/main/resources/application.properties` with your MySQL credentials:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Running the Application
1. Navigate to the backend directory:
```bash
cd revtickets-backend
```

2. Run the application:
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### API Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/events` - Get all events
- `GET /api/events/category/{category}` - Get events by category
- `GET /api/events/{id}` - Get event by ID
- `GET /api/events/search?q={query}` - Search events
- `POST /api/admin/events` - Create event (admin only)

### Default Admin User
Email: admin@revtickets.com
Password: any password (for demo purposes)

### Notes
- JWT authentication is simplified for demo purposes
- CORS is configured for frontend at http://localhost:4200
- Database tables will be created automatically on first run