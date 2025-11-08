'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center md:items-start gap-6 max-w-2xl">
      <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left">
        Minha audiência, sua audiência.
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 text-center md:text-left">
        Conectamos Donos de Canais e Anunciantes num só lugar. Descubra, confie e colabore com segurança.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/choose-profile">
          <Button size="lg" className="btn-gradient w-full sm:w-auto">
            Quero Anunciar
          </Button>
        </Link>
        <Link href="/choose-profile">
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Quero Monetizar
          </Button>
        </Link>
      </div>
    </div>
  );
}