import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // <-- Import Provider-nya
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  return (
    // Bungkus seluruh aplikasi dengan CartProvider
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-base text-secondary font-sans">
          <Navbar />
          <main className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;