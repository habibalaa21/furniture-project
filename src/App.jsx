import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Shop from "./pages/shop.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/profile";
import Cart from "./pages/Cart.jsx";
import Categories from "./pages/categories";
import Contact from "./pages/contact";
import Login from "./pages/Login.jsx";
import Blog from "./pages/Blog.jsx";

import { AuthProvider } from "./AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />

          {/* Protected Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/Cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
