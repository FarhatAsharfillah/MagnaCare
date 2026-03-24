import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Data Carousel (Bisa kamu ganti gambarnya nanti)
    const slides = [
        {
            id: 1,
            title: "Cleansing Series",
            image: "/images/Carousel_Daily_Purifying.png",
            link: "/products#cleansing-series" // <-- Arahkan ke ID
        },
        {
            id: 2,
            title: "Hydration Boost",
            image: "/images/Carousel_Acne_Combat.png",
            link: "/products#hydration-boost" // <-- Arahkan ke ID
        },
        {
            id: 3,
            title: "Daily Protection",
            image: "/images/Carousel_Deep_Sea.png",
            link: "/products#daily-protection" // <-- Arahkan ke ID
        }
    ];

    // Logika Auto-Slide (Ganti gambar tiap 3.5 detik)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 3500);
        return () => clearInterval(timer); // Bersihkan memori saat pindah halaman
    }, [slides.length]);

    return (
        <div className="flex flex-col items-center w-full flex-grow">

            {/* --- CAROUSEL SECTION --- */}
            <div className="w-full max-w-6xl mx-auto px-4 pt-10 pb-6">
                <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-sm group">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            {/* Efek gelap tipis di atas gambar */}
                            <div className="absolute inset-0 bg-black/40 z-10"></div>
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover transform scale-105"
                            />
                            <Link to={slide.link} className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer group hover:bg-black/20 transition-all duration-500">
                                <h2 className="text-white text-3xl md:text-5xl font-heading font-bold tracking-widest uppercase drop-shadow-lg group-hover:scale-105 transition-transform duration-500">
                                    {slide.title}
                                </h2>
                                <span className="mt-4 text-white/80 font-sans text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                                    Explore Collection <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </span>
                            </Link>
                        </div>
                    ))}

                    {/* Indikator Titik (Dots) di bawah */}
                    <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125 w-8" : "bg-white/50 hover:bg-white/80"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- TEKS UTAMA --- */}
            <div className="max-w-3xl text-center px-4 py-8 mb-12">
                <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-secondary">
                    Greatness Starts Here.
                </h1>
                <p className="text-lg md:text-xl font-sans mb-10 text-secondary/80">
                    Premium skincare for the modern man. Simple, natural, and specifically designed for your daily routine.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/products" className="bg-primary text-base px-8 py-3 rounded-full font-semibold font-sans hover:opacity-90 transition-all shadow-lg text-white inline-block">
                        Shop Now
                    </Link>
                    <Link to="/contact" className="bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold font-sans hover:bg-primary/10 transition-all inline-block">
                        Book Consultation
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Hero;