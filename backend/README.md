# Karigar API - Backend

A FastAPI-based REST API for a hyperlocal services marketplace platform. This backend handles authentication, user management, services, bookings, and reviews for customers, providers, and admins.

## 🚀 Tech Stack

- **FastAPI** - Modern, fast web framework for building APIs
- **Python 3.12+** - Programming language
- **MongoDB** - NoSQL database (via PyMongo)
- **Uvicorn** - ASGI server
- **JWT** - JSON Web Tokens for authentication (python-jose)
- **Passlib** - Password hashing (bcrypt)
- **Pydantic** - Data validation

## 📋 Prerequisites

- Python 3.12 or higher
- MongoDB (running locally or remote)
- pip or uv package manager

## 🛠️ Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies using pip:
```bash
pip install fastapi uvicorn pymongo python-dotenv passlib[bcrypt] python-jose pydantic[email]
```

Or install from requirements.txt:
```bash
pip install -r requirements.txt
```

Alternatively, if using `uv`:
```bash
uv pip install -r requirements.txt
```

## ⚙️ Configuration

The application uses MongoDB. By default, it connects to:
- **MongoDB URL**: `mongodb://localhost:27017/`
- **Database Name**: `techtitans`

You can modify these settings in `app/db/database.py` or use environment variables.

### JWT Configuration

JWT settings are in `app/utils/jwt.py`:
- **Secret Key**: Currently set to "SUPER_SECRET_KEY" (change in production!)
- **Algorithm**: HS256
- **Token Expiry**: 60 minutes

**⚠️ Important**: Update the SECRET_KEY in production environments!

## 🏃 Running the Application

### Development Mode

```bash
uvicorn app.main:app --reload
```

This will start the server at `http://localhost:8000`.

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📚 API Documentation

Once the server is running, you can access:
- **Interactive API Docs (Swagger UI)**: `http://localhost:8000/docs`
- **Alternative API Docs (ReDoc)**: `http://localhost:8000/redoc`

## 🗂️ Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── auth.py          # Authentication endpoints
│   │       ├── booking.py       # Booking endpoints
│   │       ├── customer/        # Customer-specific routes
│   │       ├── provider/        # Provider-specific routes
│   │       ├── admin/           # Admin-specific routes
│   │       └── api_router.py    # API router configuration
│   ├── core/
│   │   ├── config.py           # Configuration settings
│   │   ├── dependencies.py     # Dependency injection (auth helpers)
│   │   └── security.py         # Security utilities
│   ├── crud/                   # CRUD operations
│   │   ├── booking.py
│   │   ├── review.py
│   │   ├── service.py
│   │   └── user.py
│   ├── db/
│   │   ├── database.py         # MongoDB connection and collections
│   │   └── base.py             # Base database setup
│   ├── models/                 # Data models
│   │   ├── booking.py
│   │   ├── review.py
│   │   ├── service.py
│   │   └── user.py
│   ├── schemas/                # Pydantic schemas
│   │   ├── booking.py
│   │   ├── review.py
│   │   ├── service.py
│   │   └── user.py
│   ├── utils/                  # Utility functions
│   │   ├── hashing.py          # Password hashing
│   │   ├── jwt.py              # JWT token management
│   │   └── validators.py       # Validation utilities
│   └── main.py                 # FastAPI application entry point
├── requirements.txt            # Python dependencies
├── pyproject.toml             # Project configuration
└── README.md                  # This file
```

## 🔌 API Endpoints

### Authentication (`/api/v1/auth`)

- `POST /api/v1/auth/register` - Register a new user
  - Body: `{ "name": string, "email": string, "password": string, "role": "customer" | "provider" | "admin" }`
  - Returns: User details (without password)

- `POST /api/v1/auth/login` - Login and get access token
  - Query params: `email` (string), `password` (string)
  - Returns: `{ "access_token": string, "token_type": "bearer" }`

### Customer Routes (`/api/v1/customer`)
- Customer-specific endpoints (see API docs)

### Provider Routes (`/api/v1/provider`)
- Provider-specific endpoints (see API docs)

### Admin Routes (`/api/v1/admin`)
- Admin-specific endpoints (see API docs)

### Booking Routes (`/api/v1/booking`)
- Booking management endpoints (see API docs)

### Health Check

- `GET /` - API status check
  - Returns: `{ "message": "Karigar API is running" }`

- `GET /test_db` - Database connection test
  - Returns: Database connection status and collections

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Most endpoints require authentication via Bearer token:

```
Authorization: Bearer <access_token>
```

### Role-Based Access Control

The API supports three user roles:
- **customer** - Service consumers
- **provider** - Service providers
- **admin** - Platform administrators

Role-based dependencies are available in `app/core/dependencies.py`:
- `get_current_user` - Get current authenticated user
- `get_current_customer` - Ensure user is a customer
- `get_current_provider` - Ensure user is a provider
- `get_current_admin` - Ensure user is an admin

## 🗄️ Database

The application uses MongoDB with the following collections:
- `users` - User accounts (customers, providers, admins)
- `services` - Service listings
- `bookings` - Service bookings/requests
- `reviews` - Service reviews and ratings

## 📝 User Roles

- **customer**: Can browse services, make bookings, write reviews
- **provider**: Can create services, manage bookings, set availability
- **admin**: Full platform access and management

## 🧪 Testing

To test the database connection:
```bash
curl http://localhost:8000/test_db
```

To test the API status:
```bash
curl http://localhost:8000/
```

## 🔒 Security Notes

1. **Change SECRET_KEY**: Update `SECRET_KEY` in `app/utils/jwt.py` for production
2. **Use Environment Variables**: Store sensitive configuration in environment variables
3. **HTTPS**: Use HTTPS in production
4. **Password Hashing**: Passwords are hashed using bcrypt before storage
5. **CORS**: Configure CORS appropriately for your frontend domain

## 🚀 Deployment

For production deployment:

1. Set environment variables for database connection
2. Update SECRET_KEY
3. Configure CORS for your frontend domain
4. Use a production ASGI server (e.g., Gunicorn with Uvicorn workers)
5. Set up MongoDB with proper authentication
6. Enable HTTPS

## 📦 Dependencies

Key dependencies:
- `fastapi>=0.125.0` - Web framework
- `uvicorn>=0.38.0` - ASGI server
- `pymongo>=4.15.5` - MongoDB driver
- `pydantic[email]>=2.12.5` - Data validation
- `python-jose>=3.5.0` - JWT handling
- `passlib[bcrypt]` - Password hashing

See `requirements.txt` or `pyproject.toml` for complete list.

## 👥 Team

- Faizan
- Hanzla
- Ayesha

## 📄 License

This project is part of Tech Titans Web Hackathon.

## 🤝 Contributing

This is a hackathon project. For issues or improvements, please contact the team members.

