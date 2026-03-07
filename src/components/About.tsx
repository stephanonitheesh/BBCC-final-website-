import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const features = [
    'Professional Coaching Staff',
    'State-of-the-Art Training Facilities',
    'Regular Tournament Participation',
    'Youth Development Programs',
    'Community Events & Networking',
    'Exclusive Member Benefits'
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2073&auto=format&fit=crop"
                alt="Cricket Training"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary/90 to-transparent">
                <p className="text-white font-display font-bold text-2xl">
                  "Excellence is not a skill, it's an attitude."
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              OUR STORY
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8 leading-tight">
              BONDED BROTHERS <span className="text-secondary italic">CRICKET CLUB</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed text-justify">
              Founded on the principles of brotherhood and sporting excellence, Bonded Brothers CC 
              has grown from a local group of enthusiasts into a premier cricket community. 
              We believe in nurturing talent, fostering sportsmanship, and building a legacy 
              that transcends the boundary ropes.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
