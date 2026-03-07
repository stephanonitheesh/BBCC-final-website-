import { motion } from 'motion/react';
import { Trophy, Users, Calendar, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Stats() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { icon: Trophy, label: 'TITLES WON', value: '12+' },
    { icon: Users, label: 'MEMBERS', value: '250+' },
    { icon: Calendar, label: 'MATCHES PLAYED', value: '450+' },
    { icon: Target, label: 'WIN RATE', value: '78%' },
  ];

  const StatSkeleton = () => (
    <div className="text-center animate-pulse">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10" />
      <div className="h-10 w-20 bg-white/10 rounded mx-auto mb-2" />
      <div className="h-4 w-24 bg-white/5 rounded mx-auto" />
    </div>
  );

  return (
    <div className="bg-primary py-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            [1, 2, 3, 4].map(i => <StatSkeleton key={i} />)
          ) : (
            stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-secondary group-hover:border-secondary transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-secondary group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-sm font-bold text-gray-400 tracking-widest uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
