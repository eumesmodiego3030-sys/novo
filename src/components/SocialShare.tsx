import { motion } from 'framer-motion';
import {
  Facebook,
  MessageCircle,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  title: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'circle';
  showLabels?: boolean;
}

export const SocialShare = ({
  title,
  description,
  url = typeof window !== 'undefined' ? window.location.href : '',
  imageUrl,
  className = '',
  variant = 'horizontal',
  showLabels = false,
}: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast({
      title: 'Link copied!',
      description: 'Shared link copied to clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareData = {
    title,
    description: description || title,
    url,
    imageUrl,
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      action: () => {
        const text = `${shareData.title}\n${shareData.url}`;
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text)}`,
          '_blank'
        );
      },
      color: '#25D366',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
          '_blank'
        );
      },
      color: '#1877F2',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => {
        const text = `${shareData.title} ${shareData.url}`;
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
          '_blank'
        );
      },
      color: '#1DA1F2',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
          '_blank'
        );
      },
      color: '#0A66C2',
    },
    {
      name: 'Email',
      icon: Mail,
      action: () => {
        const subject = encodeURIComponent(shareData.title);
        const body = encodeURIComponent(`${shareData.description}\n\n${shareData.url}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      },
      color: '#EA4335',
    },
    {
      name: 'Copy Link',
      icon: copied ? Check : Copy,
      action: handleCopyLink,
      color: '#6B7280',
    },
  ];

  const containerVariants = {
    horizontal: 'flex gap-3',
    vertical: 'flex flex-col gap-3',
    circle: 'flex gap-2',
  };

  const buttonVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.1, y: -2 },
    tap: { scale: 0.95 },
  };

  return (
    <div className={`${containerVariants[variant]} ${className}`}>
      {shareOptions.map((option) => {
        const Icon = option.icon;
        return (
          <motion.button
            key={option.name}
            onClick={option.action}
            className={`
              relative group transition-all duration-200
              ${
                variant === 'circle'
                  ? 'p-2 rounded-full'
                  : 'px-4 py-2 rounded-lg flex items-center gap-2'
              }
              hover:shadow-lg
              ${
                variant === 'circle'
                  ? 'bg-foreground/10 hover:bg-foreground/20'
                  : 'bg-background border border-foreground/20 hover:border-foreground/40'
              }
            `}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            title={option.name}
          >
            <Icon
              size={variant === 'circle' ? 20 : 18}
              color={option.color}
              className="transition-transform"
            />
            {showLabels && variant !== 'circle' && (
              <span className="text-sm font-medium text-foreground">
                {option.name}
              </span>
            )}

            {/* Tooltip */}
            {variant === 'circle' && (
              <motion.div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-foreground text-background rounded text-xs font-medium whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, y: 4 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                {option.name}
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

// Social Share Button with Counter
export const SocialShareWithCounter = ({
  title,
  description,
  url,
  className = '',
}: Omit<SocialShareProps, 'variant' | 'showLabels'>) => {
  const [shareCount, setShareCount] = useState(0);

  return (
    <motion.div
      className={`flex flex-col items-center gap-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <p className="text-sm text-foreground/60">Share this content</p>
        {shareCount > 0 && (
          <motion.p
            className="text-xs text-primary font-medium mt-1"
            key={shareCount}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {shareCount} shares
          </motion.p>
        )}
      </div>

      <SocialShare
        title={title}
        description={description}
        url={url}
        variant="horizontal"
        showLabels={true}
      />
    </motion.div>
  );
};
