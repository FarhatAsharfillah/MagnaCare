import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'bank_transfer'
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Kalkulasi Total
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const priceNumber = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
            return total + (priceNumber * item.quantity);
        }, 0);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // Tembak API Backend
            const response = await fetch('http://localhost:5000/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    totalAmount: calculateTotal(), // Kirim total harga
                    items: cart // Kirim isi keranjang
                }),
            });

            if (response.ok) {
                setIsProcessing(false);
                setIsSuccess(true);
                clearCart(); // Kosongkan keranjang setelah sukses masuk database
            } else {
                alert('Gagal memproses pesanan. Silakan coba lagi.');
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Error saat checkout:", error);
            alert('Terjadi kesalahan jaringan. Pastikan backend menyala.');
            setIsProcessing(false);
        }

        // Simulasi proses pembayaran ke API (delay 2 detik)
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart(); // Kosongkan keranjang
        }, 2000);
    };

    // Tampilan jika keranjang kosong dan belum sukses
    if (cart.length === 0 && !isSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-heading font-bold text-secondary mb-4">Access Denied</h2>
                <p className="font-sans text-secondary/70 mb-8">Your shopping cart is currently empty. Please select products first.</p>
                <Link to="/products" className="bg-primary text-white px-8 py-3 rounded-full font-semibold">Back to Shopping</Link>
            </div>
        );
    }

    // Tampilan Sukses
    if (isSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.svg.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-4xl font-heading font-bold text-secondary mb-4">Payment Successful!</h2>
                <p className="font-sans text-secondary/70 max-w-lg mb-8">
                    Thank you, <strong>{formData.fullName}</strong>. Your order is being processed and will be shipped to your address in <strong>{formData.city}</strong>.
                </p>
                <button onClick={() => navigate('/')} className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90">
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 px-6 max-w-7xl mx-auto flex-grow w-full">
            <h2 className="text-4xl font-heading font-bold text-secondary mb-10 text-center">Checkout</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Kolom Kiri: Form Pengiriman & Pembayaran */}
                <div className="lg:col-span-2 space-y-8">
                    <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/5 font-sans space-y-6">
                        <h3 className="text-2xl font-heading font-bold text-secondary border-b pb-4">Shipping Details</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-secondary/80 mb-2">Full Name</label>
                                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/50" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary/80 mb-2">Full Address</label>
                                <textarea name="address" required value={formData.address} onChange={handleChange} rows="3" className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/50 resize-none" placeholder="Nama Jalan, Gedung, No. Rumah..."></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary/80 mb-2">City / District</label>
                                    <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/50" placeholder="Jakarta Selatan" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary/80 mb-2">Postal Code</label>
                                    <input type="number" name="postalCode" required value={formData.postalCode} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/50" placeholder="12345" />
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-heading font-bold text-secondary border-b pb-4 mt-8 pt-4">Payment Method</h3>
                        <div className="space-y-3">
                            <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                <input type="radio" name="paymentMethod" value="bank_transfer" checked={formData.paymentMethod === 'bank_transfer'} onChange={handleChange} className="w-5 h-5 text-primary" />
                                <span className="ml-3 font-medium">Bank Transfer (BCA, Mandiri, BNI)</span>
                            </label>
                            <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                <input type="radio" name="paymentMethod" value="ewallet" checked={formData.paymentMethod === 'ewallet'} onChange={handleChange} className="w-5 h-5 text-primary" />
                                <span className="ml-3 font-medium">E-Wallet (GoPay, OVO, Dana)</span>
                            </label>
                        </div>
                    </form>
                </div>

                {/* Kolom Kanan: Order Summary */}
                <div className="bg-gray-50 p-8 rounded-3xl shadow-sm border border-secondary/5 h-fit sticky top-24">
                    <h3 className="text-xl font-heading font-bold text-secondary border-b pb-4 mb-6">Order Summary</h3>
                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center font-sans text-sm">
                                <span className="text-secondary/80 truncate pr-4">{item.name} <span className="text-primary font-bold">x{item.quantity}</span></span>
                                <span className="font-semibold">{formatRupiah(parseInt(item.price.replace(/[^0-9]/g, ''), 10) * item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4 space-y-3 font-sans text-sm">
                        <div className="flex justify-between text-secondary/70"><span>Subtotal</span><span>{formatRupiah(calculateTotal())}</span></div>
                        <div className="flex justify-between text-secondary/70"><span>Shipping</span><span className="text-green-600 font-bold">Free</span></div>
                        <div className="flex justify-between text-lg font-heading font-bold text-secondary mt-4 pt-4 border-t">
                            <span>Total</span><span>{formatRupiah(calculateTotal())}</span>
                        </div>
                    </div>
                    <button type="submit" form="checkout-form" disabled={isProcessing} className={`w-full mt-8 py-4 rounded-xl font-bold text-white transition-all ${isProcessing ? 'bg-primary/50 cursor-wait' : 'bg-primary hover:bg-secondary'}`}>
                        {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;