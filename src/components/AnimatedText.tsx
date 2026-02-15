import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}

export const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  duration = 0.05,
  staggerDelay = 0.03,
}: AnimatedTextProps) => {
  const words = text.split(" ");
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * staggerDelay,
        duration,
      },
    }),
  };

  return (
    <div className={className}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="inline-block mr-2">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              custom={wordIndex * 10 + charIndex}
              variants={charVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const RevealText = ({ text, className = "", delay = 0 }: RevealTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="overflow-hidden"
    >
      <motion.p
        className={className}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0 0 0)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: "easeInOut" }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  cursor?: boolean;
}

export const Typewriter = ({
  text,
  className = "",
  speed = 50,
  cursor = true,
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <p className={className}>
      {displayedText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="ml-1 inline-block w-1 h-5 bg-primary"
        />
      )}
    </p>
  );
};
