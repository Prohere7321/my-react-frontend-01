import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Items from "./pages/Items";
import ItemDetail from "./pages/ItemDetail";
import UserManagement from "./pages/UserManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/items" />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/users" element={<UserManagement />} />   {/* NEW */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;