import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SelectionTerrain from './pages/SelectionTerrain'
import PageDateHeure from './pages/PageDateHeure'
import Home from './pages/Home'
import ReservationPage from './pages/ReservationPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import PaymentPage from './pages/PaymentPage'
import AdminTerrains from './pages/AdminTerrains';
import AdminLogin from './pages/AdminLogin';

// Composant de protection
const PrivateRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('adminToken') === 'true';
  return isAdmin ? children : <Navigate to="/admin-login" />;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selection-terrain" element={<SelectionTerrain />} />
        <Route path="/date-heure" element={<PageDateHeure />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />

        {/* Routes admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminTerrains />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App