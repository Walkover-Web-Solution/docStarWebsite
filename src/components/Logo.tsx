import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', animated = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const LogoImage = () => (
    <img
      src="https://stuff.thingsofbrand.com/docstar.io/images/imgd_docstar.png"
      alt="DocStar Logo"
      className={`${sizeClasses[size]} object-contain ${className}`}
    />
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -5, 5, 0],
        }}
        transition={{ duration: 0.3 }}
      >
        <LogoImage />
      </motion.div>
    );
  }

  return <LogoImage />;
};

export default Logo;