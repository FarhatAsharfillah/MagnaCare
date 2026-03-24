import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [quantities, setQuantities] = useState({});
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

    const location = useLocation(); // <-- Tambahkan ini

    // ... (useEffect fetchProducts tetap ada di sini)

    // SIHIR SMOOTH SCROLLING
    useEffect(() => {
        // Jika loading sudah selesai dan ada hashtag di URL (misal: #daily-protection)
        if (!loading && location.hash) {
            // Cari elemen yang ID-nya sama dengan hashtag (tanpa tanda #)
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                // Beri sedikit jeda agar gambar sempat dimuat, lalu gulir mulus ke sana!
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [loading, location.hash]);

  const handleQuantityChange = (productId, delta) => {
    setQuantities(prev => {
      const currentQty = prev[productId] || 1;
      const newQty = currentQty + delta;
      return { ...prev, [productId]: newQty > 1 ? newQty : 1 };
    });
  };

  const handleAddToCart = (product) => {
    const qtyToAdd = quantities[product.id] || 1;
    addToCart(product, qtyToAdd);
    
    setToast({ show: true, message: `${qtyToAdd}x ${product.name} added to cart!` });
    
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-heading text-secondary">
        Loading Magna Care Catalog...
      </div>
    );
  }

  // SIHIR PEMBAGIAN KATALOG: Memecah 9 produk menjadi 3 kelompok
  const catalogSections = [
    {
      title: "Cleansing Series",
      subtitle: "Start your routine with a clean and fresh canvas.",
      items: products.slice(0, 3) // Mengambil produk urutan 1-3
    },
    {
      title: "Hydration Boost",
      subtitle: "Deep moisture and targeted care for a healthier glow.",
      items: products.slice(3, 6) // Mengambil produk urutan 4-6
    },
    {
      title: "Daily Protection",
      subtitle: "Complete your grooming and shield against the elements.",
      items: products.slice(6, 9) // Mengambil produk urutan 7-9
    }
  ];

  return (
    <div className="min-h-screen py-16 px-6 max-w-7xl mx-auto relative">
      
      {/* TOAST NOTIFICATION */}
      <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-secondary text-white px-6 py-3 rounded-full shadow-2xl font-sans text-sm flex items-center gap-3">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          {toast.message}
        </div>
      </div>

      {/* HEADER UTAMA HALAMAN */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-heading font-bold text-secondary mb-4">Our Products</h2>
      </div>

      {/* LOOPING SETIAP KATEGORI */}
      <div className="space-y-24"> 
              {/* Tambahkan id={...} pada div ini */}
              {catalogSections.map((section, index) => (
                  <div
                      key={index}
                      id={section.title.toLowerCase().replace(/\s+/g, '-')}
                      className="pt-8 border-t border-secondary/10 first:border-0 first:pt-0 scroll-mt-24"
                  >
            
            {/* Judul & Subjudul Kategori */}
            <div className="text-center mb-10">
              <h3 className="text-3xl font-heading font-bold text-secondary mb-3">{section.title}</h3>
              <p className="text-secondary/60 font-sans">{section.subtitle}</p>
            </div>

            {/* Grid Produk dalam Kategori (Sama seperti sebelumnya) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {section.items.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-secondary/5 flex flex-col p-5">
                  
                  <div className="aspect-square overflow-hidden bg-gray-50 rounded-xl mb-6">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop"; }}
                    />
                  </div>

                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-heading font-bold text-secondary mb-2">{product.name}</h3>
                    <p className="text-sm text-secondary/70 font-sans mb-6 flex-grow">{product.description}</p>
                    
                    <div className="text-xl font-sans font-bold text-primary mb-4">
                      {product.price}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 h-12 flex-1">
                        <button onClick={() => handleQuantityChange(product.id, -1)} className="w-10 h-full flex items-center justify-center text-secondary hover:bg-gray-200 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                        </button>
                        <span className="flex-1 text-center font-sans font-bold text-secondary">{quantities[product.id] || 1}</span>
                        <button onClick={() => handleQuantityChange(product.id, 1)} className="w-10 h-full flex items-center justify-center text-secondary hover:bg-gray-200 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </button>
                      </div>
                      <button onClick={() => handleAddToCart(product)} className="bg-primary text-white h-12 px-6 rounded-xl hover:bg-secondary transition-colors flex items-center justify-center shadow-md shadow-primary/30">
                        <svg xmlns="http://www.svg.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;