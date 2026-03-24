import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { getCartCount } = useCart();
    // State untuk mengontrol buka/tutup menu di HP
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fungsi untuk menutup menu otomatis setelah link diklik
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="bg-secondary border-b border-white/10 sticky top-0 z-50">
            <div className="flex items-center justify-between px-6 py-4 relative">

                {/* Logo Magna Care */}
                <Link to="/" className="cursor-pointer z-10 flex items-center" onClick={closeMobileMenu}>
                    <img
                        src="/MagnaCare.png"
                        alt="Magna Care"
                        className="h-8 md:h-10 object-contain scale-[4] origin-left md:ml-4"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                    />
                    <span className="text-2xl font-heading font-bold text-white hidden">MagnaCare.</span>
                </Link>

                {/* Desktop Menu (Sembunyi di HP) */}
                <ul className="hidden md:flex space-x-8 font-sans font-medium text-white/80 absolute left-1/2 transform -translate-x-1/2">
                    <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                    <li><Link to="/products" className="hover:text-primary transition-colors">Products</Link></li>
                    <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                </ul>

                {/* Bagian Kanan: Cart & Hamburger Button */}
                <div className="flex items-center space-x-4 z-10">
                    <Link to="/cart" className="font-sans font-medium text-white hover:text-primary transition-colors flex items-center gap-2 group" onClick={closeMobileMenu}>
                        <svg xmlns="http://www.svg.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">{getCartCount()}</span>
                    </Link>

                    {/* Tombol Hamburger (Hanya muncul di HP) */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white focus:outline-none"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                // Ikon Silang (X) jika menu terbuka
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                // Ikon Garis Tiga (Hamburger) jika menu tertutup
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-secondary border-t border-white/10">
                    <ul className="flex flex-col font-sans text-white/90 px-6 py-4 space-y-4">
                        <li><Link to="/" onClick={closeMobileMenu} className="block hover:text-primary transition-colors text-lg">Home</Link></li>
                        <li><Link to="/products" onClick={closeMobileMenu} className="block hover:text-primary transition-colors text-lg">Products</Link></li>
                        <li><Link to="/contact" onClick={closeMobileMenu} className="block hover:text-primary transition-colors text-lg">Contact</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;