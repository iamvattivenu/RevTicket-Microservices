@echo off
echo Building all microservices...

cd revtickets-microservices

echo Building API Gateway...
cd api-gateway
call mvn clean package -DskipTests
cd ..

echo Building Auth Service...
cd auth-service
call mvn clean package -DskipTests
cd ..

echo Building Event Service...
cd event-service
call mvn clean package -DskipTests
cd ..

echo Building Booking Service...
cd booking-service
call mvn clean package -DskipTests
cd ..

echo Building Notification Service...
cd notification-service
call mvn clean package -DskipTests
cd ..

echo Building Payment Service...
cd payment-service
call mvn clean package -DskipTests
cd ..

echo Building Review Service...
cd review-service
call mvn clean package -DskipTests
cd ..

cd ..

echo All microservices built successfully!
echo Now run: docker-compose up --build
