'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import CallToAction from '@/components/CallToAction';
import Gallery from '@/components/Gallery';
import CardDetail from '@/components/CardDetail';

export default function Home() {
  const [heroCompleted, setHeroCompleted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        onComplete={() => setHeroCompleted(true)}
        isCompleted={heroCompleted}
      />

      <div className={`transition-opacity duration-500 ${heroCompleted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <CallToAction />
        <Gallery
          onCardSelect={(card) => {
            setSelectedCard(card);
            setIsTransitioning(true);
          }}
        />
      </div>

      {selectedCard && (
        <CardDetail
          card={selectedCard}
          isOpen={isTransitioning}
          onClose={() => {
            setIsTransitioning(false);
            setTimeout(() => setSelectedCard(null), 300);
          }}
        />
      )}
    </div>
  );
}
