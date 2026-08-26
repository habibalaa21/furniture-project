import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Shop from "./pages/shop.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/profile";
import Cart from "./pages/cart";
import Categories from "./pages/categories";
import Contact from "./pages/contact";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/shop" element={<Shop />} />
         <Route path="/about" element={<About />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/categories" element={<Categories />} />
         <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
}