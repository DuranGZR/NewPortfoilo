"use client";

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ThinkingCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function ThinkingCard({ icon: Icon, title, description, index }: ThinkingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative"
    >
      <div className="relative h-full p-6 rounded-2xl glass-card overflow-hidden transition-all duration-500 group-hover:translate-y-[-4px]">

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#819fa7]/8 via-transparent to-[#5b6e74]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(129, 159, 167, 0.15), transparent, rgba(91, 110, 116, 0.1))',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon with animation */}
          <motion.div
            className="mb-5 w-14 h-14 rounded-xl bg-gradient-to-br from-[#819fa7]/15 to-[#5b6e74]/10 border border-[#819fa7]/20 flex items-center justify-center group-hover:border-[#819fa7]/40 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-6 h-6 text-[#819fa7] group-hover:scale-110 transition-transform duration-300" />
          </motion.div>

          {/* Title */}
          <h3 className="text-lg font-display font-bold text-[#f3f5f9] mb-3 group-hover:text-[#819fa7] transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#f3f5f9]/60 leading-relaxed group-hover:text-[#f3f5f9]/70 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#819fa7]/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
