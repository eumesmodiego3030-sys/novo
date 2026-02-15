/**
 * EXEMPLOS DE USO DOS COMPONENTES E HOOKS IMPLEMENTADOS
 * 
 * Estes exemplos mostram como integrar os 4 novos componentes/hooks:
 * 1. TouchCarousel - Carrossel com swipe e gestos
 * 2. AnimatedInput - Inputs com animações sofisticadas
 * 3. SocialShare - Botões de compartilhamento social
 * 4. Performance Hooks - Otimização de bundle e rendering
 */

// ===========================
// 1. USAR TOUCHCAROUSEL
// ===========================

import { TouchCarousel } from '@/components/TouchCarousel';

export function TreatmentsCarouselExample() {
  const treatments = [
    {
      id: 1,
      title: 'Botox',
      content: (
        <div className="p-8 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl">
          <h3 className="text-xl font-bold">Botox Treatment</h3>
          <p>Advanced wrinkle reduction therapy</p>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Dermal Fillers',
      content: (
        <div className="p-8 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-xl">
          <h3 className="text-xl font-bold">Dermal Fillers</h3>
          <p>Volume restoration and contour enhancement</p>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Laser Therapy',
      content: (
        <div className="p-8 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl">
          <h3 className="text-xl font-bold">Laser Therapy</h3>
          <p>Skin rejuvenation and resurfacing</p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-96">
      <TouchCarousel
        items={treatments}
        autoPlay={true}
        autoPlayInterval={4000}
        showNav={true}
        itemsPerView={1}
        className="w-full h-full"
      />
    </div>
  );
}

// ===========================
// 2. USAR ANIMATEDINPUT
// ===========================

import { AnimatedInput } from '@/components/AnimatedInput';
import { Mail, Phone } from 'lucide-react';
import { useRef, useState } from 'react';

export function ContactFormExample() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState({
    email: '',
    phone: '',
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^(\+\d{1,3})?(\s?\d{1,14})$/.test(phone);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      phone: e.target.value,
    }));
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <AnimatedInput
        ref={nameRef}
        label="Full Name"
        type="text"
        placeholder="Your name"
        className="w-full"
      />

      <AnimatedInput
        ref={emailRef}
        label="Email Address"
        type="email"
        placeholder="your@email.com"
        icon={<Mail size={18} />}
        value={formState.email}
        onChange={handleEmailChange}
        validation={validateEmail}
        error="Please enter a valid email"
        success={validateEmail(formState.email)}
        className="w-full"
      />

      <AnimatedInput
        ref={phoneRef}
        label="Phone Number"
        type="tel"
        placeholder="+55 (11) 99999-9999"
        icon={<Phone size={18} />}
        value={formState.phone}
        onChange={handlePhoneChange}
        validation={validatePhone}
        error="Please enter a valid phone number"
        success={validatePhone(formState.phone)}
        className="w-full"
      />

      <AnimatedInput
        label="Password"
        type="password"
        placeholder="••••••••"
        className="w-full"
      />
    </div>
  );
}

// ===========================
// 3. USAR SOCIALSHARE
// ===========================

import { SocialShare, SocialShareWithCounter } from '@/components/SocialShare';

export function ProductShareExample() {
  return (
    <div className="space-y-8">
      {/* Formato horizontal com labels */}
      <div>
        <h3 className="mb-4 font-semibold">Compartilhe em redes sociais:</h3>
        <SocialShare
          title="Confira meu novo tratamento de beleza!"
          description="Resultados incríveis com tecnologia de ponta"
          url="https://tatiana-torres-beauty.com/treatments/botox"
          variant="horizontal"
          showLabels={true}
        />
      </div>

      {/* Formato circular (compacto) */}
      <div>
        <h3 className="mb-4 font-semibold">Compartilhe rápido:</h3>
        <SocialShare
          title="Confira este tratamento"
          variant="circle"
        />
      </div>

      {/* Com contador de shares */}
      <SocialShareWithCounter
        title="Novo serviço de rejuvenescimento!"
        description="Tecnologia avançada para sua beleza"
      />
    </div>
  );
}

// ===========================
// 4. USAR PERFORMANCE HOOKS
// ===========================

import {
  useScrollPerformance,
  useLazyImage,
  useComponentPerformance,
  useDebouncedValue,
} from '@/hooks/use-performance';

// Exemplo 1: Scroll Performance
export function OptimizedSectionExample() {
  const { ref, isVisible } = useScrollPerformance();

  return (
    <div ref={ref} className="py-12">
      {isVisible ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold">Este conteúdo está visível!</h2>
          <p>Carregado apenas quando entra na viewport</p>
        </div>
      ) : (
        <div className="text-center text-foreground/50">
          <p>Aguardando scroll...</p>
        </div>
      )}
    </div>
  );
}

// Exemplo 2: Lazy Image Loading
export function LazyImageExample() {
  const { ref, imageSrc, isLoading } = useLazyImage(
    'https://example.com/large-image.jpg'
  );

  return (
    <div ref={ref}>
      {isLoading ? (
        <div className="animate-pulse bg-foreground/10 h-96 rounded" />
      ) : (
        <img src={imageSrc || ''} alt="Lazy loaded" className="w-full rounded" />
      )}
    </div>
  );
}

// Exemplo 3: Monitor Component Performance
export function HighPerformanceComponent() {
  useComponentPerformance('HighPerformanceComponent');

  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebouncedValue(filter, 300);

  // Debounced value evita renderizações excessivas durante digitar
  const filteredItems = ['Item 1', 'Item 2', 'Item 3'].filter((item) =>
    item.toLowerCase().includes(debouncedFilter.toLowerCase())
  );

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
        className="w-full px-4 py-2 border rounded"
      />
      <ul className="mt-4 space-y-2">
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Exemplo 4: Lazy Route Loading
import { LazyRoute } from '@/hooks/use-lazy-component';

// No seu arquivo de rotas:
// const LazyTreatmentsPage = LazyRoute(() => import('@/pages/Treatments'));
// const LazyAboutPage = LazyRoute(() => import('@/pages/About'));

export const lazyRoutes = {
  treatments: LazyRoute(() => import('@/pages/TreatmentsSection')),
  about: LazyRoute(() => import('@/pages/AboutSection')),
  gallery: LazyRoute(() => import('@/pages/Gallery')),
};

// ===========================
// INTEGRAÇÃO COMPLETA - PÁGINA DE EXEMPLO
// ===========================

export function ModernBeautyPageExample() {
  return (
    <div className="space-y-16 py-12">
      {/* Seção de Carrossel */}
      <section className="px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-8">Nossos Tratamentos</h2>
        <TreatmentsCarouselExample />
      </section>

      {/* Seção de Contato */}
      <section className="px-4 md:px-8 bg-foreground/5 py-12 rounded-xl">
        <h2 className="text-3xl font-bold mb-8">Agendamento</h2>
        <ContactFormExample />
      </section>

      {/* Seção Social Share */}
      <section className="px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-8">Compartilhe</h2>
        <ProductShareExample />
      </section>

      {/* Seção Otimizada */}
      <section>
        <OptimizedSectionExample />
      </section>
    </div>
  );
}

export default ModernBeautyPageExample;
