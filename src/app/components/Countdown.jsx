import { motion } from 'framer-motion';

export default function Countdown({ timeLeft }) {
    const units = {
        days: 'أيام',
        hours: 'ساعات',
        minutes: 'دقائق',
        seconds: 'ثواني'
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-16">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div
                    key={unit}
                    className="countdown-item"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <div className="countdown-value">
                        {value.toString().padStart(2, '0')}
                    </div>
                    <div className="countdown-label">
                        {units[unit]}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
