import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
>;

interface ButtonProps extends NativeButtonProps {
  variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-navy-500 hover:bg-navy-400 text-white shadow-lg shadow-navy-900/50',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
  ghost: 'bg-transparent hover:bg-white/10 text-white',
};

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-semibold text-base lg:text-xl transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none touch-manipulation ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
