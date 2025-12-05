# Email Service Setup for Password Reset

## Gmail Configuration

To enable email sending for password reset, you need to configure Gmail SMTP settings:

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to Security
3. Enable 2-Step Verification

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" as the app
3. Select "Other" as the device and name it "RevTickets"
4. Click "Generate"
5. Copy the 16-character password (remove spaces)

### Step 3: Update application.properties
Open `revtickets-backend/src/main/resources/application.properties` and update:

```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-16-char-app-password
```

Replace:
- `your-email@gmail.com` with your actual Gmail address
- `your-16-char-app-password` with the app password from Step 2

### Step 4: Restart Backend
After updating the configuration, restart your Spring Boot application:
```bash
mvn spring-boot:run
```

## Testing

1. Go to http://localhost:4200/forgot-password
2. Enter your email address
3. Click "Send Reset Link"
4. Check your email inbox for the password reset link
5. Click the link to reset your password

## Alternative Email Providers

### Using Outlook/Hotmail
```properties
spring.mail.host=smtp-mail.outlook.com
spring.mail.port=587
spring.mail.username=your-email@outlook.com
spring.mail.password=your-password
```

### Using Yahoo
```properties
spring.mail.host=smtp.mail.yahoo.com
spring.mail.port=587
spring.mail.username=your-email@yahoo.com
spring.mail.password=your-app-password
```

## Troubleshooting

- **Authentication failed**: Make sure you're using an App Password, not your regular Gmail password
- **Connection timeout**: Check if your firewall is blocking port 587
- **Email not received**: Check spam/junk folder
- **Invalid credentials**: Verify the email and app password are correct in application.properties
