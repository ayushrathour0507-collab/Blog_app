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
└── DEPLOYMENT.md      # Deployment instructions
```

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