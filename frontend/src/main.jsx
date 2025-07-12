import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Home from "./components/Home.jsx";
import ListItemForm from "./components/ListItemForm.jsx";
import UserProfile from "./components/UserProfile.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import ItemDetailPage from "./components/ItemDetailPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/list-product" element={<ListItemForm />} />
      <Route path="/profile/:username" element={<UserProfile />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/item/:id" element={<ItemDetailPage />} />
    </Routes>
  </BrowserRouter>
);
