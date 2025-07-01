// components/SubscriptionForm.jsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SubscriptionForm() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('entry.830826815', email);   // Email
            formData.append('entry.1205323287', phone);  // Phone

            await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfQw6wcvSIeBYz9u03GV81jcQq_eGpAXXrBvu1nGPURG_QWiA/formResponse', {
                method: 'POST',
                mode: 'no-cors',
                body: formData,
            });

            setIsSubmitted(true);
            setEmail('');
            setPhone('');
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (err) {
            setError('حدث خطأ، يرجى المحاولة مرة أخرى');
            console.error('Error submitting form:', err);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">


                <div className="relative">
                    <input
                        type="email"
                        required
                        placeholder="بريدك الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 bg-slate-800 bg-opacity-50 backdrop-blur-lg border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-slate-500"
                        disabled={isSubmitting}
                    />
                </div>


                <div className="relative">
                    <input
                        type="tel"
                        required
                        placeholder="رقم الهاتف"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-5 py-4 bg-slate-800 bg-opacity-50 backdrop-blur-lg border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-slate-500"
                        disabled={isSubmitting}
                    />
                </div>

                <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            جاري الإرسال...
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            إشعارني عند الإطلاق
                        </>
                    )}
                </button>

                {isSubmitted && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-emerald-500 bg-opacity-20 border border-emerald-500 text-emerald-300 rounded-lg"
                    >
                        ✅ تم التسجيل بنجاح! سنخبرك عند الإطلاق
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-rose-500 bg-opacity-20 border border-rose-500 text-rose-300 rounded-lg"
                    >
                        {error}
                    </motion.div>
                )}
            </form>
        </div>
    );
}
