import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './Home';
import BoxesList from './BoxesList';
import BoxDetails from './BoxDetails';
import NotFound from './NotFound';
import Login from './Login';
import Register from './Register';
import AdminBoxesList from './AdminBoxesList';
import PrivateRoute from './PrivateRoute';
import AdminBoxDetails from './AdminBoxDetails';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boxes" element={<BoxesList />} />
        <Route path="/boxes/:id" element={<BoxDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute roleRequired="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/boxes"
          element={
            <PrivateRoute roleRequired="admin">
              <AdminBoxesList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/boxes/:id"
          element={
            <PrivateRoute roleRequired="admin">
              <AdminBoxDetails />
            </PrivateRoute>
          }
        />

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
