import { useState, useRef, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

interface BeforeAfterSliderProps {
  beforeLabel: string;
  afterLabel: string;
  treatment: string;
}

const BeforeAfterSlider = ({ beforeLabel, afterLabel, treatment }: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div className="text-center">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize select-none border border-border/30"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Before (full width, below) */}
        <div className="absolute inset-0 bg-secondary">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-heading text-muted-foreground/30 font-light">Before</span>
          </div>
        </div>

        {/* After (clipped by position) */}
        <div
          className="absolute inset-0 bg-primary/10"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-heading text-primary/30 font-light">After</span>
          </div>
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground/80 z-10"
          style={{ left: `${position}%` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary shadow-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary">
              <path d="M5 3L2 8L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 3L14 8L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-4 left-4 text-xs font-body font-semibold tracking-widest uppercase text-foreground/60 bg-background/70 backdrop-blur-sm px-3 py-1 rounded-full">
          {beforeLabel}
        </span>
        <span className="absolute bottom-4 right-4 text-xs font-body font-semibold tracking-widest uppercase text-foreground/60 bg-background/70 backdrop-blur-sm px-3 py-1 rounded-full">
          {afterLabel}
        </span>
      </div>
      <p className="text-sm text-muted-foreground font-body mt-3">{treatment}</p>
    </div>
  );
};

const comparisons = [
  { beforeLabel: "Before", afterLabel: "After", treatment: "Lip Fillers Enhancement" },
  { beforeLabel: "Before", afterLabel: "After", treatment: "Anti-Wrinkle Treatment" },
  { beforeLabel: "Before", afterLabel: "After", treatment: "Skin Rejuvenation" },
];

const BeforeAfterSection = () => (
  <section id="results" className="section-luxury">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body font-bold">
            Real results
          </p>
          <h2 className="section-heading text-foreground mb-2">
            Before & <span className="italic text-primary font-medium">After</span>
          </h2>
          <div className="luxury-divider" />
          <p className="section-subheading mt-6 font-medium">
            Drag the slider to see the transformation. Results may vary per individual.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {comparisons.map((c, i) => (
          <ScrollReveal key={c.treatment} delay={i * 0.12}>
            <BeforeAfterSlider {...c} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3}>
        <p className="text-center text-xs text-muted-foreground/60 font-body mt-8 italic">
          * Individual results may vary. All images show real client results with consent.
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default BeforeAfterSection;
