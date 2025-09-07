'use client';

import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-card border border-border rounded-2xl p-12 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Пак со случайной картой
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Каждый пак содержит одну уникальную коллекционную карточку.
            Вы не знаете какая именно карта попадется — в этом вся магия коллекционирования!
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-secondary/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Стандартный пак</h3>
              <p className="text-3xl font-bold text-primary mb-2">₽299</p>
              <p className="text-sm text-muted-foreground mb-4">
                Гарантированная карта любой редкости
              </p>
              <Button className="w-full rounded-lg">
                Купить пак
              </Button>
            </div>

            <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Популярный
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Премиум пак</h3>
              <p className="text-3xl font-bold text-primary mb-2">₽599</p>
              <p className="text-sm text-muted-foreground mb-4">
                Повышенный шанс редких карт
              </p>
              <Button className="w-full rounded-lg">
                Купить пак
              </Button>
            </div>

            <div className="bg-secondary/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Элитный пак</h3>
              <p className="text-3xl font-bold text-primary mb-2">₽999</p>
              <p className="text-sm text-muted-foreground mb-4">
                Гарантированная редкая или легендарная карта
              </p>
              <Button className="w-full rounded-lg">
                Купить пак
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>🎁 Каждая карта уникальна и имеет свой голографический эффект</p>
            <p>📦 Мгновенное получение после покупки</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
