import { Route, Routes, Navigate } from 'react-router-dom'
import { PrivateRoute } from '_routing'
import { Home, Login, Signup, Publish, Post, Update } from '../pages'

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/publish"
        element={
          <PrivateRoute>
            <Publish />
          </PrivateRoute>
        }
      />
      <Route
        path="/post/:id"
        element={
          <PrivateRoute>
            <Post />
          </PrivateRoute>
        }
      />
      <Route
        path="/post/update/:id"
        element={
          <PrivateRoute>
            <Update />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export { AppRoutes }
