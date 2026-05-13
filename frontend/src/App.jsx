import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SelectionTerrain from './pages/SelectionTerrain'
import PageDateHeure from './pages/PageDateHeure'
import Home from './pages/Home'
import ReservationPage from './pages/ReservationPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import PaymentPage from './pages/PaymentPage'
import AdminTerrains from './pages/AdminTerrains';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminTerrains />} />
        <Route path="/selection-terrain" element={<SelectionTerrain />} />
        <Route path="/date-heure" element={<PageDateHeure />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App