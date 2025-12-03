import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { DataContext } from '../components/DataProvider/DataProvider'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Auth from '../pages/Auth/Auth'
import MedicineInput from '../pages/Dashboard/MedicineInput/MedicineInput'
import DailyTasks from '../pages/Dashboard/DailyTasks/Dailytasks'
import AiAssistance from '../pages/Dashboard/AiAssistance/AiAssistance'
import NotFound from '../pages/NotFound/NotFound'
import Dashboard from '../pages/Dashboard/Dashboard'
import DashboardBody from '../pages/Dashboard/DashboardBody'
import ProgressChart from '../pages/Dashboard/Progress/ProgressChart'
import ProgressMain from '../pages/Dashboard/Progress/ProgressMain'

const Routing = () => {
  const [{ user }] = useContext(DataContext)

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      {/* Auth Page: prevent logged-in user from seeing login */}
      <Route
        path="/auth"
        element={!user ? <Auth /> : <Navigate to="/dashboard" replace />}
      />

      {/* Protected Dashboard Routes */}
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute msg="Please sign in to view your dashboard">
      <Dashboard />
    </ProtectedRoute>
  }
>
  {/* Default page */}
  <Route index element={<Navigate to="dashboardBody" replace />} />

  {/* Nested pages for sidebar */}
  <Route path="medicineinput" element={<MedicineInput />} />
  <Route path="tasks" element={<DailyTasks />} />
  <Route path="aihelp" element={<AiAssistance />} />
  <Route path="progress" element={<ProgressMain/>  } />
  <Route path="dashboardBody" element={<DashboardBody />} />
</Route>


      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Routing
