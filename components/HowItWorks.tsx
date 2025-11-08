'use client';

import FeatureCard from '@/components/FeatureCard';
import { ShieldCheck, Stars, Search } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 md:px-12 bg-[--kula-background]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Como Funciona</h2>
        <p className="text-gray-600 text-center mt-2 max-w-2xl mx-auto">
          Três pilares para relacionamentos confiáveis entre Donos de Canais e Anunciantes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <FeatureCard
            icon={<Search className="text-[--kula-secondary]" />}
            title="Descoberta"
            description="Explore canais por plataforma, audiência e preço. Compare rapidamente e encontre o fit ideal."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-[--kula-secondary]" />}
            title="Confiança (Escrow)"
            description="Pagamento protegido até a entrega. Acordos claros, etapas visíveis e menos fricção."
          />
          <FeatureCard
            icon={<Stars className="text-[--kula-secondary]" />}
            title="Reputação"
            description="Avaliações reais constroem credibilidade. Melhores parceiros se destacam ao longo do tempo."
          />
        </div>
      </div>
    </section>
  );
}



