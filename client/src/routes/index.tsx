import Dashboard from '@/pages/Dashboard'
import { Routes, Route } from 'react-router'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}

export default Router;