import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Items from "./pages/Items";
import ItemDetail from "./pages/ItemDetail";
import UserManagement from "./pages/UserManagement";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/items" />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;