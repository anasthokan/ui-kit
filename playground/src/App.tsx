import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import ComponentPage from './pages/ComponentPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/component/:name" element={<ComponentPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
