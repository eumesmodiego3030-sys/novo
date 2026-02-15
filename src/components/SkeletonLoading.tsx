import { motion } from 'framer-motion';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
  circle?: boolean;
}

export const Skeleton = ({
  width = '100%',
  height = '20px',
  className = '',
  count = 1,
  circle = false
}: SkeletonProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, i) => (
        <motion.div
          key={i}
          className={`bg-gradient-to-r from-muted to-muted-foreground/20 ${className} ${
            circle ? 'rounded-full' : 'rounded-lg'
          }`}
          style={{
            width,
            height,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
};

export const SkeletonCard = () => (
  <div className="glass-card space-y-4">
    <Skeleton height="200px" />
    <Skeleton width="80%" height="24px" />
    <Skeleton width="60%" height="16px" />
    <div className="space-y-2">
      <Skeleton height="16px" />
      <Skeleton width="90%" height="16px" />
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        width={i === lines - 1 ? '70%' : '100%'}
        height="16px"
      />
    ))}
  </div>
);
