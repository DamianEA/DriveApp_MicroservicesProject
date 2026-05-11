import { Routes, Route, Navigate } from "react-router";
import Login from "./Login";
import Users from "./Users";
import RegUsers from "./users/RegUsers";
import Navigation from './Nav';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('user') !== null;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<RegUsers />} />
      <Route 
        path="/users" 
        element={
          isAuthenticated() ? (<><Navigation /> <Users /></>) : (<Navigate to="/login" />)
          } 
      />

      <Route 
        path="/main" 
        element={
          isAuthenticated() ? (<><Navigation /> <Users /> </>) : (<Navigate to="/login" />)
        } 
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;