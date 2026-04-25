# Blog App

A full-stack blog application with user authentication, post management, and a modern UI.

## Features

- User registration and login with email/password
- Create, read, update, and delete blog posts
- Responsive UI with dark/light theme support
- RESTful API backend
- Secure authentication with JWT tokens

## Tech Stack

### Backend (blog_api)
- **Framework**: FastAPI
- **Database**: PostgreSQL (via SQLAlchemy)
- **Authentication**: JWT with bcrypt password hashing
- **CORS**: Enabled for frontend access

### Frontend (blog_ui)
- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Hooks
- **API Client**: Axios

## Project Structure

```
blog_app/
├── blog_api/          # Backend API
│   └── project/
│       ├── main.py    # FastAPI app entry point
│       ├── database.py
│       ├── auth/      # Authentication logic
│       ├── models/    # Database models
│       ├── routers/   # API endpoints
│       ├── schemas/   # Pydantic schemas
│       └── tests/     # Unit tests
├── blog_ui/           # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── api/
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml # Docker orchestration
├── .env.example       # Environment variables template
└── .github/workflows/ # CI/CD pipeline
```

---

## 🚀 Quick Start (Docker Compose)

```bash
# 1. Clone the repository
git clone <repository-url>
cd blog-app

# 2. Copy environment variables
cp .env.example .env

# 3. Start all services
docker-compose up --build

# 4. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        F[Frontend<br/>React + Vite<br/>:3000]
    end
    
    subgraph "API Layer"
        B[Backend<br/>FastAPI + Uvicorn<br/>:8000]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL<br/>:5432)]
    end
    
    F -->|HTTP| B
    B -->|SQL| DB
```

---

## 📋 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_USER` | Database username | `bloguser` |
| `POSTGRES_PASSWORD` | Database password | `changeme` |
| `POSTGRES_DB` | Database name | `blogdb` |
| `DATABASE_URL` | Full database connection string | `postgresql://bloguser:changeme@db:5432/blogdb` |
| `SECRET_KEY` | JWT secret key | `your-secret-key-change-in-production` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:3000,http://localhost:5173` |
| `VITE_API_URL` | Backend API URL | `http://localhost:8000` |

### DATABASE_URL Format

```
postgresql://username:password@hostname:port/database_name
```

**Important**: Use the Docker service name (`db`) as hostname, NOT `localhost` or `127.0.0.1`.

---

## 🐳 Docker Commands

### Build & Run Full Stack

```bash
# Build all containers
docker-compose build

# Start all services in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Individual Service Commands

```bash
# Backend only
cd blog_api/project
docker build -t blog-backend .
docker run -p 8000:8000 --env-file ../../.env blog-backend

# Frontend only
cd blog_ui
docker build -t blog-frontend .
docker run -p 3000:80 blog-frontend
```

---

## 🔧 Development Commands

### Backend

```bash
cd blog_api/project

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn main:app --reload

# Run tests
pytest tests/ -v
```

### Frontend

```bash
cd blog_ui

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## ⚙️ CI/CD Pipeline

The project includes GitHub Actions workflow for continuous integration.

### Pipeline Stages

```mermaid
flowchart LR
    A[Checkout] --> B[Setup Python]
    B --> C[Install Dependencies]
    C --> D[Run Tests]
    D --> E{Tests Pass?}
    E -->|Yes| F[Build Frontend]
    E -->|No| G[Fail]
    F --> H[Complete]
```

### Workflow File

- **Location**: `.github/workflows/ci.yml`
- **Triggers**: Push to any branch, Pull requests to main/develop

### Running CI Locally

```bash
# Simulate CI environment
docker run -it python:3.11-slim bash
pip install -r requirements.txt
pytest tests/
```

---

## 🔨 Break/Fix Demo

### How to Intentionally Break CI

```bash
# Method 1: Break tests
echo "assert False" >> blog_api/project/tests/test_api.py
git add . && git commit -m "break tests" && git push

# Method 2: Break build
echo "invalid syntax" >> blog_ui/src/App.jsx
git add . && git commit -m "break build" && git push

# Method 3: Break Dockerfile
echo "INVALID" > blog_api/project/Dockerfile
```

### How to Fix CI

```bash
# 1. Check workflow run logs
# Navigate to: GitHub > Actions > Failed Run > Logs

# 2. Common fixes:
# - Test failure: Fix test assertions
# - Build failure: Check syntax errors
# - Dependency issue: Update package versions

# 3. Verify fix
git checkout -- .
git log --oneline -5
git diff HEAD~1
```

### Logs to Check

| Log Location | What to Look For |
|--------------|------------------|
| GitHub Actions | `Run pytest` output, `npm run build` errors |
| Docker | `docker-compose logs backend`, container startup errors |
| Backend | `/health` endpoint, database connection errors |
| Browser Console | CORS errors, 404/500 status codes |

---

## 🛠️ Common Errors & Fixes

### 1. Database Connection Issue

**Error**: `could not connect to server: Connection refused`

**Cause**: Using `localhost` instead of Docker service name

**Fix**:
```yaml
# Wrong
DATABASE_URL=postgresql://user:pass@localhost:5432/blogdb

# Correct
DATABASE_URL=postgresql://user:pass@db:5432/blogdb
```

### 2. CORS Issue

**Error**: `Access to fetch at 'http://localhost:8000' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Fix**:
```python
# In main.py, ensure CORS_ORIGINS includes frontend URL
os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:5173")
```

### 3. Port Mismatch

**Error**: `bind: address already in use`

**Fix**:
```bash
# Check what's using the port
netstat -ano | findstr "8000"

# Kill process
taskkill /PID <PID> /F

# Or use different port in docker-compose.yml
ports:
  - "8001:8000"
```

### 4. Docker Build Failure

**Error**: `failed to solve with frontend dockerfile`

**Fix**:
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check Dockerfile syntax
docker build -t test . -f Dockerfile
```

---

## 📄 File Reference

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Orchestrates all services |
| `blog_api/project/Dockerfile` | Backend container image |
| `blog_ui/Dockerfile` | Frontend container image |
| `blog_ui/nginx.conf` | Nginx configuration for serving SPA |
| `.env.example` | Environment variables template |
| `.github/workflows/ci.yml` | GitHub Actions CI pipeline |

---

## 📄 License

MIT License - See LICENSE file for details

## Setup and Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL database

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd blog_api/project
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables (create a `.env` file):
   ```
   DATABASE_URL=postgresql://user:password@localhost/blog_db
   SECRET_KEY=your-secret-key-here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. Run database migrations (if using Alembic):
   ```bash
   alembic upgrade head
   ```

6. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd blog_ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (create a `.env` file):
   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Posts
- `GET /posts` - Get all posts
- `POST /posts` - Create a new post (authenticated)
- `GET /posts/{id}` - Get a specific post
- `PUT /posts/{id}` - Update a post (author only)
- `DELETE /posts/{id}` - Delete a post (author only)

## Testing

### Backend Tests
```bash
cd blog_api/project
pytest
```

### Frontend Tests
```bash
cd blog_ui
npm test
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions to Railway (backend) and Vercel/Netlify (frontend).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.