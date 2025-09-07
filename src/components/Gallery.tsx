'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Card {
  id: string;
  name: string;
  category: 'cars' | 'marvel';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  description: string;
  characteristics: Record<string, string>;
}

interface GalleryProps {
  onCardSelect: (card: Card) => void;
}

// Моковые данные для демонстрации
const mockCards: Card[] = [
  {
    id: '1',
    name: 'Lamborghini Aventador',
    category: 'cars',
    rarity: 'legendary',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
    description: 'Легендарный суперкар с невероятной мощностью',
    characteristics: { 'Мощность': '740 л.с.', 'Скорость': '350 км/ч', 'Год': '2023' }
  },
  {
    id: '2',
    name: 'Железный человек',
    category: 'marvel',
    rarity: 'legendary',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=300&fit=crop',
    description: 'Тони Старк в броне Mark 85',
    characteristics: { 'Сила': '95/100', 'Интеллект': '100/100', 'Скорость': '85/100' }
  },
  {
    id: '3',
    name: 'BMW M3',
    category: 'cars',
    rarity: 'epic',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    description: 'Спортивный седан с превосходной управляемостью',
    characteristics: { 'Мощность': '480 л.с.', 'Скорость': '290 км/ч', 'Год': '2024' }
  },
  {
    id: '4',
    name: 'Человек-паук',
    category: 'marvel',
    rarity: 'epic',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=300&fit=crop',
    description: 'Питер Паркер в классическом костюме',
    characteristics: { 'Сила': '80/100', 'Ловкость': '100/100', 'Скорость': '90/100' }
  },
  {
    id: '5',
    name: 'Tesla Model S',
    category: 'cars',
    rarity: 'rare',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    description: 'Электрический седан будущего',
    characteristics: { 'Мощность': '1020 л.с.', 'Запас хода': '650 км', 'Год': '2024' }
  },
  {
    id: '6',
    name: 'Капитан Америка',
    category: 'marvel',
    rarity: 'rare',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=300&fit=crop',
    description: 'Стив Роджерс с вибраниумным щитом',
    characteristics: { 'Сила': '85/100', 'Защита': '95/100', 'Лидерство': '100/100' }
  }
];

const rarityColors = {
  common: 'bg-gray-100 text-gray-800',
  rare: 'bg-blue-100 text-blue-800',
  epic: 'bg-purple-100 text-purple-800',
  legendary: 'bg-orange-100 text-orange-800'
};

const Gallery: React.FC<GalleryProps> = ({ onCardSelect }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cars' | 'marvel'>('all');

  const filteredCards = mockCards.filter(card =>
    activeFilter === 'all' || card.category === activeFilter
  );

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Коллекция карточек
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Изучите все возможные карточки, которые могут попасться в паках.
            Каждая карта имеет уникальный дизайн и голографические эффекты.
          </p>
        </div>

        {/* Фильтры */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-secondary rounded-lg">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveFilter('all')}
              className="rounded-md"
            >
              Все карты
            </Button>
            <Button
              variant={activeFilter === 'cars' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveFilter('cars')}
              className="rounded-md"
            >
              Автомобили
            </Button>
            <Button
              variant={activeFilter === 'marvel' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveFilter('marvel')}
              className="rounded-md"
            >
              Marvel
            </Button>
          </div>
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer card-hover group"
              onClick={() => onCardSelect(card)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 holographic-effect opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                {/* Редкость */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${rarityColors[card.rarity]}`}>
                    {card.rarity === 'common' && 'Обычная'}
                    {card.rarity === 'rare' && 'Редкая'}
                    {card.rarity === 'epic' && 'Эпическая'}
                    {card.rarity === 'legendary' && 'Легендарная'}
                  </span>
                </div>
              </div>

              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2">
                  {card.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
