import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from '../components/AppShell'
import ProtectedRoute from '../components/ProtectedRoute'
import EditPostPage from '../pages/EditPostPage'
import LoginPage from '../pages/LoginPage'
import NewPostPage from '../pages/NewPostPage'
import NotFoundPage from '../pages/NotFoundPage'
import PostDetailPage from '../pages/PostDetailPage'
import PostsPage from '../pages/PostsPage'
import RegisterPage from '../pages/RegisterPage'

export default function AppRoutes() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route
          path="/posts/new"
          element={
            <ProtectedRoute>
              <NewPostPage />
            </ProtectedRoute>
          }
        />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route
          path="/posts/:id/edit"
          element={
            <ProtectedRoute>
              <EditPostPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  )
}
