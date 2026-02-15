import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface AnimatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  validation?: (value: string) => boolean;
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({
    label,
    error,
    success,
    icon,
    validation,
    type = 'text',
    className = '',
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      if (validation) {
        setIsValid(validation(newValue) || newValue === '');
      }
      props.onChange?.(e);
    };

    const isPassword = type === 'password';
    const displayType = isPassword && showPassword ? 'text' : type;
    const hasValue = value.length > 0;
    const showError = error && !isValid;
    const showSuccess = success && hasValue && isValid;

    return (
      <div className="relative w-full">
        <div className="relative">
          {/* Animated Label */}
          {label && (
            <motion.label
              className="absolute left-4 origin-left pointer-events-none text-foreground/60"
              animate={{
                y: isFocused || hasValue ? -24 : 0,
                scale: isFocused || hasValue ? 0.85 : 1,
                color: isFocused
                  ? 'hsl(var(--primary))'
                  : 'hsl(var(--foreground) / 0.6)',
              }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.label>
          )}

          {/* Input Container */}
          <div className="relative">
            {icon && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 pointer-events-none">
                {icon}
              </div>
            )}

            <motion.input
              ref={ref}
              type={displayType}
              value={value}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`
                w-full px-4 py-3 rounded-lg
                border-2 transition-all duration-200
                bg-background text-foreground
                placeholder:text-foreground/50
                disabled:opacity-50 disabled:cursor-not-allowed
                ${icon ? 'pl-12' : ''}
                ${
                  showError
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : showSuccess
                      ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                      : isFocused
                        ? 'border-primary focus:border-primary focus:ring-2 focus:ring-primary/20'
                        : 'border-foreground/20 hover:border-foreground/30'
                }
                ${className}
              `}
              animate={{
                boxShadow: isFocused
                  ? '0 0 0 3px hsl(var(--primary) / 0.1)'
                  : '0 0 0 0px hsl(var(--primary) / 0)',
              }}
              {...props}
            />

            {/* Password Toggle */}
            {isPassword && (
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.button>
            )}

            {/* Success Icon */}
            {showSuccess && !isPassword && (
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle size={20} />
              </motion.div>
            )}

            {/* Error Icon */}
            {showError && !isPassword && (
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <AlertCircle size={20} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {showError && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 text-sm text-red-500 flex items-center gap-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && success && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 text-sm text-green-500 flex items-center gap-1"
            >
              <CheckCircle size={16} />
              Valid
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedInput.displayName = 'AnimatedInput';
