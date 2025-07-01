// app/layout.jsx
import '@fontsource/tajawal/400.css';
import '@fontsource/tajawal/500.css';
import '@fontsource/tajawal/700.css';
import './globals.css';

export const metadata = {
    title: 'متجرنا الإلكتروني - قريباً',
    description: 'متجر إلكتروني جديد قيد الإنشاء',
};

export default function RootLayout({ children }) {
    return (
        <html lang="ar" dir="rtl">
        <body className="bg-slate-900 text-white min-h-screen">
        {children}
        </body>
        </html>
    );
}
