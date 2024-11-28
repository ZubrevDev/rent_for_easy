// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import { AuthProvider } from './context/AuthContext';
import Home from './components/layout/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import Apartments from './components/apartments/Apartments';
import Contracts from './components/contracts/Contracts';
import LandlordDashboard from './components/dashboard/LandlordDashboard';
import TenantDashboard from './components/dashboard/TenantDashboard';


function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;