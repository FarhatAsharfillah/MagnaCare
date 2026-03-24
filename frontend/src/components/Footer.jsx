import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-secondary text-base pt-16 pb-8 border-t border-secondary/10 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                {/* Kolom 1: Brand Info */}
                <div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-4">MagnaCare</h3>
                    <p className="text-base/70 font-sans leading-relaxed mb-6">
                        Premium skincare for the modern man. Formulated with the finest natural ingredients to complement your daily routine.
                    </p>
                </div>

                {/* Kolom 2: Quick Links */}
                <div>
                    <h4 className="text-2xl font-heading font-bold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-3 font-sans text-base/70">
                        <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li><Link to="/products" className="hover:text-primary transition-colors">Products</Link></li>
                        <li><Link to="/contact" className="hover:text-primary transition-colors">Contact & Booking</Link></li>
                    </ul>
                </div>

                {/* Kolom 3: Contact & Social */}
                <div>
                    <h4 className="text-2xl font-heading font-bold text-white mb-4">Connect With Us</h4>
                    <ul className="space-y-3 font-sans text-base/70 mb-6">
                        <li>hello@magnacare.id</li>
                        <li>+62 812 3456 7890</li>
                        <li>Jakarta, Indonesia</li>
                    </ul>
                </div>

            </div>

            {/* Copyright Bar */}
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm font-sans text-base/50">
                <p>&copy; {new Date().getFullYear()} MagnaCare. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <span className="cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
                    <span className="cursor-pointer hover:text-primary transition-colors">Terms of Service</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;