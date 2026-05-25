import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Users from './Users';
import ProtectedRoute from './ProtectedRoute';
import Principal from './Principal';
import PublicRegister from './PublicRegister';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<PublicRegister />} />

      <Route element={<ProtectedRoute allowedRoles={['Administrador', 'Normal', 'User']} />}>
        <Route path="/main" element={<Principal />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['Administrador']} />}>
        <Route path="/usuarios" element={<Users />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;