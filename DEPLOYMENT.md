# Deployment Guide

## Backend (Railway)

### Changes Made
- Added User model with email/password authentication
- New endpoints: `POST /auth/register` and `POST /auth/login`
- Added CORS middleware for frontend access
- Dependencies: `passlib[bcrypt]`, `pydantic[email]`

### Deploy Steps
1. Commit changes:
   ```bash
   cd blog_api/project
   git add .
   git commit -m "feat: add email/password auth"
   ```

2. Push to GitHub (Railway auto-deploys):
   ```bash
   git push origin main
   ```

3. Verify deployment:
   ```bash
   curl https://web-production-43399.up.railway.app/health
   curl -X POST https://web-production-43399.up.railway.app/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"test123"}'
   ```

## Frontend (Vercel/Netlify)

### Changes Made
- Updated auth API to use email/password
- New RegisterPage with email/password/confirm fields
- Updated LoginPage with email/password fields
- Added `_redirects` file for Netlify SPA routing

### Deploy to Vercel
1. Push `blog_ui` to GitHub
2. Go to vercel.com → New Project
3. Import your repo
4. Set environment variable:
   - `VITE_API_BASE_URL` = `https://web-production-43399.up.railway.app`
5. Build settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Root directory: `blog_ui` (if monorepo)
6. Deploy

### Deploy to Netlify
1. Push `blog_ui` to GitHub
2. Go to netlify.com → New site from Git
3. Import your repo
4. Set environment variable:
   - `VITE_API_BASE_URL` = `https://web-production-43399.up.railway.app`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `blog_ui` (if monorepo)
6. Deploy

## Testing Locally

### Backend
```bash
cd blog_api/project
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd blog_ui
npm install
npm run dev
```

Update `.env` to point to local backend:
```
VITE_API_BASE_URL=http://localhost:8000
```

## API Endpoints

### Auth
- `POST /auth/register` - Register with email/password
- `POST /auth/login` - Login with email/password

### Posts (requires JWT)
- `GET /posts` - List posts
- `POST /posts` - Create post (auth required)
- `GET /posts/{id}` - Get post
- `PUT /posts/{id}` - Update post (auth required)
- `DELETE /posts/{id}` - Delete post (auth required)
