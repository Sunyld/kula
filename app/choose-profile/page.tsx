'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function ChooseProfile() {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center px-6 md:px-20 mt-16">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-3xl md:text-5xl font-bold">Escolha seu perfil</h1>
          <p className="text-gray-600 mt-3">Você quer anunciar ou monetizar sua audiência?</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="border rounded-xl p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold">Anunciante</h2>
              <p className="text-gray-600 mt-2">Encontre canais e feche campanhas com segurança.</p>
              <Link href="/register">
                <Button size="lg" className="btn-gradient w-full mt-4">Continuar</Button>
              </Link>
            </div>
            <div className="border rounded-xl p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold">Criador/Dono de Canal</h2>
              <p className="text-gray-600 mt-2">Monetize seu canal com marcas alinhadas.</p>
              <Link href="/register">
                <Button size="lg" variant="outline" className="w-full mt-4">Continuar</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}



