'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaTiktok, FaInstagram, FaYoutube, FaFacebook, FaTelegram, FaTwitter } from 'react-icons/fa';
import { SiKuaishou, SiVimeo } from 'react-icons/si';
import { useEffect, useState } from 'react';

const socialIcons = [
  { Icon: FaWhatsapp, color: '#25D366' },
  { Icon: FaTiktok, color: '#000000' },
  { Icon: FaInstagram, color: '#E4405F' },
  { Icon: FaYoutube, color: '#FF0000' },
  { Icon: FaFacebook, color: '#1877F2' },
  { Icon: FaTelegram, color: '#0088cc' },
  { Icon: FaTwitter, color: '#1DA1F2' },
  { Icon: SiKuaishou, color: '#FF6910' },
  { Icon: SiVimeo, color: '#1AB7EA' },
];

export default function RotatingIcons() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {socialIcons.map(({ Icon, color }, index) => (
          <div
            key={index}
            className="bg-white rounded-full p-3 shadow-md"
          >
            <Icon size={24} color={color} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-[26rem] h-[26rem] sm:w-[32rem] sm:h-[32rem] flex items-center justify-center">
      <div className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center shadow-lg">
        <span className="text-3xl sm:text-4xl font-bold text-white">λ</span>
      </div>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
      >
        {socialIcons.map(({ Icon, color }, index) => {
          const angle = (index * 360) / socialIcons.length;
          const radius = 180; // px
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <div
              key={index}
              className="absolute grid place-items-center rounded-full bg-white border shadow"
              style={{
                width: 56,
                height: 56,
                left: '50%',
                top: '50%',
                transform: `translate(${x - 28}px, ${y - 28}px)`,
              }}
            >
              <Icon size={24} color={color} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}