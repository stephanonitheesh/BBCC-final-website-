import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Play, Volume2, VolumeX } from 'lucide-react';

export default function Hero() {
  const videoContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative py-16 md:py-32 flex items-center overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop"
          alt="Cricket Stadium"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[0.9] tracking-tighter mb-8 text-balance">
                {["BONDED", "BY", "CRICKET,", "BROTHERS", "BY", "CHOICE"].map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.2em] last:mr-0"
                    variants={{
                      hidden: { opacity: 0, y: 20, rotateX: -45 },
                      visible: { opacity: 1, y: 0, rotateX: 0 },
                    }}
                    transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                  >
                    {word === "CRICKET," ? (
                      <span className="text-secondary italic relative">
                        CRICKET
                        <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-secondary/30 blur-sm" />
                      </span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-xl font-light tracking-wide text-justify"
            >
              Join the premier cricket community where passion meets performance.
              From local leagues to professional training, we define excellence on and off the field.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5"
            >
                <a href="/#about" className="group bg-secondary text-primary px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-secondary/20">
                  EXPLORE CLUB
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => {
                    videoContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group bg-white/5 backdrop-blur-xl text-white border border-white/10 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold flex items-center justify-center gap-4 hover:bg-white/10 transition-all"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-current" />
                  </div>
                  WATCH HIGHLIGHTS
                </button>
            </motion.div>
          </div>

          <motion.div
            ref={videoContainerRef}
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div
              className="relative aspect-[9/16] max-w-[320px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black group"
            >
              <iframe
                src="https://www.youtube.com/embed/cu36I838FVE?autoplay=1&mute=1&loop=1&playlist=cu36I838FVE&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3"
                title="BBCC Highlights"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
            </div>

            {/* Decorative Glow */}
            <div className="absolute -inset-4 bg-secondary/20 blur-3xl rounded-full -z-10 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
