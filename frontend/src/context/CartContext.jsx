import React, { createContext, useState, useContext } from 'react';

// 1. Membuat Context (Brankasnya)
const CartContext = createContext();

// 2. Membuat Provider (Satpam yang menjaga dan membagikan data brankas)
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Fungsi untuk menambah barang ke keranjang
    // Update fungsi ini agar menerima parameter kedua (quantityToAdd)
    const addToCart = (product, quantityToAdd = 1) => {
        setCart((prevCart) => {
            // Cek apakah barang sudah ada di keranjang
            const existingItem = prevCart.find((item) => item.id === product.id);

            if (existingItem) {
                // Jika sudah ada, tambahkan jumlahnya sesuai yang diminta
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                );
            }
            // Jika belum ada, masukkan barang baru dengan jumlah tersebut
            return [...prevCart, { ...product, quantity: quantityToAdd }];
        });
    };
    // Fungsi untuk menghapus barang dari keranjang
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    // Fungsi untuk menambah/mengurangi jumlah barang langsung dari keranjang
    const updateQuantity = (productId, delta) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + delta;
                    // Pastikan jumlah tidak bisa kurang dari 1 (kalau mau 0, user harus pakai tombol Hapus)
                    return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
                }
                return item;
            })
        );
    };

    // Fungsi untuk mengosongkan keranjang setelah checkout sukses
    const clearCart = () => {
        setCart([]);
    };

    // Fungsi untuk menghitung total barang di lambang Cart Navbar
    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartCount, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// 3. Custom Hook (Jalan pintas agar komponen lain mudah mengambil data)
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);