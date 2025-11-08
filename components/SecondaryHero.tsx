'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SecondaryHero() {
  return (
    <section className="py-20 px-4 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Encontre o canal certo, feche com segurança.</h2>
          <p className="text-gray-600 mt-3">Filtros avançados, escrow e reputação em um só lugar. Kula dá previsibilidade para quem vende e confiança para quem anuncia.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/marketplace">
              <Button className="btn-gradient">Explorar Marketplace</Button>
            </Link>
            <Link href="/dashboard/creator">
              <Button variant="outline">Sou Criador</Button>
            </Link>
          </div>
        </div>
        <div className="relative h-72 md:h-96">
          <Image src="/hero-illustration.svg" alt="Kula illustration" fill priority className="object-contain" />
        </div>
      </div>
    </section>
  );
}




