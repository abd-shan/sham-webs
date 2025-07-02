'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from './components/Countdown';
import { FiMail, FiPhone, FiCheck, FiX, FiPlus, FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi';

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

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
      formData.append('entry.830826815', email);
      formData.append('entry.1205323287', phone);

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

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-09-15T00:00:00'); // منتصف سبتمبر
      const difference = targetDate - new Date();

      return {
        days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
        seconds: Math.max(0, Math.floor((difference / 1000) % 60))
      };
    };


    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return null;

  return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">

        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-amber-700 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>


        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center">
          <div className="max-w-4xl w-full">

            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                className="mb-16"
            >
              <div className="logo-glow mx-auto flex items-center justify-center">
                <div className="logo-circle">
                  <span className="text-4xl font-bold text-amber-500">شام ويب</span>
                </div>
              </div>
            </motion.div>


            <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-6xl font-extrabold mb-6 text-white"
            >
              <span className="block">ثورة جديدة في التسوق الإلكتروني</span>
              <motion.span
                  className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  style={{ backgroundSize: '200% auto' }}
              >
                قريباً في عالمك!
              </motion.span>
            </motion.h1>


            <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-slate-300 max-w-2xl mx-auto mb-12"
            >
              نحن نبني تجربة تسوق فريدة ستغير مفهومك للتسوق الإلكتروني. سجل بريدك لتحصل على إشعار عند الإطلاق وكن من أوائل المستفيدين من العروض الحصرية!
            </motion.p>


            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Countdown timeLeft={timeLeft} />
            </motion.div>


            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="w-full max-w-2xl mx-auto mt-16"
            >
              <div className="subscription-form">
                <div className="form-header">
                  <div className="form-divider"></div>
                  <h2 className="form-title">
                    كن أول من يعلم عند الإطلاق!
                  </h2>
                </div>
                <div className={"w-90 max-w-90"}>
                    <form onSubmit={handleSubmit} className="form-body">

                      <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="form-group"
                      >
                        <label className="form-label">
                          <FiMail className="label-icon" />
                          البريد الإلكتروني
                        </label>
                        <div className="input-wrapper">
                          <input
                              type="email"
                              placeholder="بريدك الإلكتروني"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={isSubmitting}
                          />
                          <FiMail className="input-icon" />
                        </div>
                      </motion.div>

                      <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="form-group"
                      >
                        <label className="form-label">
                          <FiPhone className="label-icon" />
                          رقم الهاتف
                        </label>
                        <div className="input-wrapper">
                          <input
                              style={{direction:"rtl"}}
                              type="tel"
                              required
                              placeholder="رقم هاتفك"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              disabled={isSubmitting}
                          />
                          <FiPhone className="input-icon" />
                        </div>
                      </motion.div>


                      <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="form-submit"
                      >
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                              <>
                                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                جاري الإرسال...
                              </>
                          ) : (
                              <>
                                <FiPlus className="submit-icon" />
                                إشعارني عند الإطلاق
                              </>
                          )}
                        </button>
                      </motion.div>

                      {/* رسائل الحالة */}
                      <AnimatePresence>
                        {isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="form-message success-message"
                            >
                              <FiCheck className="message-icon" />
                              <span>تم التسجيل بنجاح! سنخبرك عند الإطلاق</span>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="form-message error-message"
                            >
                              <FiX className="message-icon" />
                              <span>{error}</span>
                            </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                </div>

                <div className="form-footer">
                  <p className="privacy-text">
                    نحن نحترم خصوصيتك. لن نشارك معلوماتك مع أي طرف ثالث.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* وسائل التواصل */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="social-links"
            >
              <SocialIcon icon="twitter" />
              <SocialIcon icon="instagram" />
              <SocialIcon icon="facebook" />
            </motion.div>
          </div>
        </div>

      </div>
  );
}


function SocialIcon({ icon }) {
  const icons = {
    twitter: <FiTwitter className="social-icon" />,
    instagram: <FiInstagram className="social-icon" />,
    facebook: <FiFacebook className="social-icon" />
  };

  return (
      <motion.a
          href="https://www.facebook.com/share/19dmuvS595/"
          className="social-link"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
      >
        {icons[icon]}
      </motion.a>
  );
}
