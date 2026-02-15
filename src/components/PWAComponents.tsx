import { motion } from 'framer-motion';
import { usePWA } from '@/hooks/use-pwa';

export const PWAInstallPrompt = () => {
  const { isInstallable, installApp } = usePWA();

  if (!isInstallable) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="glass-effect rounded-2xl px-6 py-4 shadow-lg flex items-center gap-4">
        <div>
          <p className="font-medium text-foreground">Install App</p>
          <p className="text-sm text-muted-foreground">Get offline access and more features</p>
        </div>
        <motion.button
          onClick={installApp}
          className="btn-primary-luxury text-sm py-2 px-4 whitespace-nowrap"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Install
        </motion.button>
      </div>
    </motion.div>
  );
};

export const OfflineIndicator = () => {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-4 left-4 z-40"
    >
      <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg px-4 py-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
        <span className="text-sm text-yellow-700 dark:text-yellow-400">You are offline</span>
      </div>
    </motion.div>
  );
};
