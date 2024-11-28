import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Apartments from './components/Apartments';
import Contracts from './components/Contracts';
import LandlordDashboard from './components/LandlordDashboard';
import TenantDashboard from './components/TenantDashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;