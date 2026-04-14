import { Routes, Route } from "react-router";
import Login from "~/Login"
import Users from "~/Users";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/usuarios" element={<Users />} />
    </Routes>
  )
}

export default App
