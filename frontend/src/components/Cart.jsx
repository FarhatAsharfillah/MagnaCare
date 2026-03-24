import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const priceNumber = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
            return total + (priceNumber * item.quantity);
        }, 0);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };

    return (
        <div className="min-h-screen py-16 px-6 max-w-4xl mx-auto flex-grow w-full relative">
            <h2 className="text-4xl font-heading font-bold text-secondary mb-10 text-center">
                Shopping Cart
            </h2>

            {cart.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-secondary/5 shadow-sm">
                    <p className="text-lg text-secondary/70 font-sans mb-6">Your cart is currently empty.</p>
                    <Link to="/products" className="bg-primary text-white px-8 py-3 rounded-full font-semibold font-sans hover:opacity-90 transition-all">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-sm border border-secondary/5 overflow-hidden">
                    <div className="p-8 space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-6 last:border-0 last:pb-0 gap-4">
                                <div className="flex items-center gap-6">
                                    <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-gray-100 mix-blend-multiply"
                                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200&auto=format&fit=crop"; }} />
                                    <div>
                                        <h3 className="text-lg font-heading font-bold text-secondary">{item.name}</h3>
                                        <p className="text-primary font-sans font-medium mb-2">{item.price}</p>

                                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-8 w-28">
                                            <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1} className="w-8 h-full flex items-center justify-center text-secondary hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                            </button>
                                            <span className="flex-1 text-center font-sans font-bold text-secondary text-sm">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-full flex items-center justify-center text-secondary hover:bg-gray-200 transition-colors">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-sans text-sm font-medium transition-colors px-4 py-2 bg-red-50 rounded-lg self-end sm:self-center">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-50 p-8 flex flex-col sm:flex-row items-center justify-between border-t border-secondary/5">
                        <div className="w-full sm:w-auto text-center sm:text-left mb-6 sm:mb-0">
                            <p className="text-sm text-secondary/70 font-sans mb-1">Estimated Total</p>
                            <p className="text-2xl font-heading font-bold text-secondary">{formatRupiah(calculateTotal())}</p>
                        </div>
                        <Link to="/checkout" className="bg-secondary text-center text-white px-10 py-4 rounded-xl font-semibold font-sans hover:bg-black transition-all w-full sm:w-auto block shadow-lg shadow-secondary/20">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;