'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Card {
  id: string;
  name: string;
  category: 'cars' | 'marvel';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  description: string;
  characteristics: Record<string, string>;
}

interface CardDetailProps {
  card: Card;
  isOpen: boolean;
  onClose: () => void;
}

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-orange-400 to-orange-600'
};

const CardDetail: React.FC<CardDetailProps> = ({ card, isOpen, onClose }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-background transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="h-full flex flex-col">
        {/* Заголовок с кнопкой назад */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к галерее
          </Button>
        </div>

        {/* Основной контент */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Левая колонка - изображение */}
              <div className="space-y-6">
                <div
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-secondary/50 cursor-pointer"
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Голографический эффект */}
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: `
                        radial-gradient(
                          circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
                          rgba(255, 255, 255, 0.3) 0%,
                          rgba(255, 255, 255, 0.1) 40%,
                          transparent 70%
                        )
                      `
                    }}
                  />

                  {/* Переливающиеся блики */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `
                        linear-gradient(
                          ${mousePosition.x * 360}deg,
                          transparent 30%,
                          rgba(139, 92, 246, 0.3) 50%,
                          rgba(59, 130, 246, 0.3) 70%,
                          transparent 90%
                        )
                      `
                    }}
                  />
                </div>
              </div>

              {/* Правая колонка - информация */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${rarityColors[card.rarity]}`}>
                      {card.rarity === 'common' && 'Обычная'}
                      {card.rarity === 'rare' && 'Редкая'}
                      {card.rarity === 'epic' && 'Эпическая'}
                      {card.rarity === 'legendary' && 'Легендарная'}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {card.name}
                  </h1>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Характеристики */}
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Характеристики
                  </h2>

                  <div className="grid gap-4">
                    {Object.entries(card.characteristics).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                        <span className="font-medium text-foreground">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Информация о редкости */}
                <div className="bg-secondary/50 rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Информация о редкости
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.rarity === 'legendary' && 'Эта карта крайне редкая! Шанс получения: менее 1%'}
                    {card.rarity === 'epic' && 'Эпическая карта с отличными характеристиками. Шанс получения: 5%'}
                    {card.rarity === 'rare' && 'Редкая карта с хорошими характеристиками. Шанс получения: 15%'}
                    {card.rarity === 'common' && 'Обычная карта, но все равно ценная для коллекции. Шанс получения: 79%'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
