'use client';

import { useState, useEffect, useRef } from 'react';

interface HeroSectionProps {
  onComplete: () => void;
  isCompleted: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onComplete, isCompleted }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isCompleted) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (!isAnimating) {
        setIsAnimating(true);

        const delta = e.deltaY;
        const newProgress = Math.min(Math.max(scrollProgress + delta * 0.002, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 0.99 && !isCompleted) {
          onComplete();
          document.body.classList.remove('scroll-lock');
        }

        setTimeout(() => setIsAnimating(false), 16);
      }
    };

    if (!isCompleted) {
      document.body.classList.add('scroll-lock');
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.body.classList.remove('scroll-lock');
    };
  }, [scrollProgress, isCompleted, onComplete, isAnimating]);

  const scale = 1 - (scrollProgress * 0.1);
  const borderRadius = scrollProgress * 24;
  const translateY = isCompleted ? 0 : scrollProgress * -10;

  return (
    <div
      ref={heroRef}
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${isCompleted ? 'h-auto' : 'h-screen'}
      `}
      style={{
        height: isCompleted ? 'auto' : '100vh',
      }}
    >
      <div
        className={`
          relative w-full bg-gradient-to-br from-primary/5 via-background to-accent/5
          flex items-center justify-center transition-all duration-200
          ${isCompleted ? 'py-8' : 'h-full'}
        `}
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          borderRadius: `${borderRadius}px`,
          margin: isCompleted ? '0 5%' : `${scrollProgress * 5}%`,
        }}
      >
        <div className="text-center z-10 px-8">
          <h1 className={`
            font-bold text-foreground mb-4 transition-all duration-300
            ${isCompleted ? 'text-4xl md:text-5xl' : 'text-6xl md:text-8xl'}
          `}>
            Luminance Gallery
          </h1>
          <p className={`
            text-muted-foreground transition-all duration-300
            ${isCompleted ? 'text-lg' : 'text-xl md:text-2xl'}
          `}>
            Коллекционные карточки с уникальными эффектами
          </p>
          {!isCompleted && (
            <div className="mt-8 text-sm text-muted-foreground/70 animate-pulse">
              Прокрутите для продолжения
            </div>
          )}
        </div>

        {/* Анимированный фон */}
        <div className="absolute inset-0 overflow-hidden rounded-inherit">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-transparent rounded-full animate-pulse opacity-50" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/10 to-transparent rounded-full animate-pulse opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
