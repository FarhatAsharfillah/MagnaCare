import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // Tembak API Backend (sesuaikan dengan API aslimu)
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                // Sembunyikan pesan sukses setelah 3 detik
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {

            // Tampilkan error asli di console untuk keperluan debugging
            console.error("Terjadi kesalahan jaringan:", error);
            setStatus({ loading: false, success: false, error: 'Gagal terhubung ke server. Pastikan backend menyala.' });

        }
    };

    return (
        <div className="min-h-screen py-16 px-6 max-w-7xl mx-auto flex-grow w-full">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-4">Get In Touch</h2>
                <p className="text-lg text-secondary/70 font-sans max-w-2xl mx-auto">
                    Have questions about our products or need personalized advice? We're here to help.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Kolom Kiri: Contact Form */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary/5">
                    <h3 className="text-2xl font-heading font-bold text-secondary mb-6">Send us a message</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-secondary/80 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                placeholder="Farhat Asharfillah"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-secondary/80 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                placeholder="farhat@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-secondary/80 mb-2">Your Message</label>
                            <textarea
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                                placeholder="How can we help you today?"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold font-sans hover:bg-secondary transition-all disabled:opacity-50 disabled:cursor-wait"
                        >
                            {status === 'sending' ? 'Sending Message...' : 'Send Message'}
                        </button>

                        {/* Pesan Sukses/Error */}
                        {status === 'success' && (
                            <p className="text-green-500 text-center mt-4 font-medium font-sans">Message sent successfully! We'll get back to you soon.</p>
                        )}
                        {status === 'error' && (
                            <p className="text-red-500 text-center mt-4 font-medium font-sans">Failed to send message. Please try again.</p>
                        )}
                    </form>
                </div>

                {/* Kolom Kanan: Calendly / Consultation Booking */}
                <div className="bg-gray-50 p-8 rounded-3xl shadow-sm border border-secondary/5 flex flex-col justify-center items-center text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                        <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-secondary mb-4">Skincare Consultation</h3>
                    <p className="text-secondary/70 font-sans mb-8 max-w-sm">
                        Not sure which product is right for you? Schedule a 1-on-1 session with our skincare expert to build your perfect routine.
                    </p>

                    {/* Tombol ini bisa kamu hubungkan ke link Calendly milikmu nanti */}
                    <a
                        href="https://calendly.com/farhatasharfillah03/30min" // <-- PASTE LINK CALENDLY DI SINI
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-secondary text-center text-white px-8 py-4 rounded-xl font-bold font-sans hover:bg-black transition-all shadow-lg shadow-secondary/20 w-full sm:w-auto inline-block"
                    >
                        Book a Consultation
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;