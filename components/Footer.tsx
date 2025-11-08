'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[--kula-primary] to-[--kula-secondary] opacity-10" />
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
              <Link href="/" className="text-2xl font-bold text-[--kula-secondary]">
              Kula
            </Link>
              <p className="mt-2 text-sm text-gray-600">Minha audiência, sua audiência.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider">Plataforma</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/marketplace" className="text-gray-600 hover:text-gray-900">Marketplace</Link></li>
                <li><Link href="/dashboard/advertiser" className="text-gray-600 hover:text-gray-900">Dashboard Anunciante</Link></li>
                <li><Link href="/dashboard/creator" className="text-gray-600 hover:text-gray-900">Dashboard Criador</Link></li>
              </ul>
          </div>
          <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Termos de Uso</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacidade</Link></li>
            </ul>
          </div>
          <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider">Siga a Kula</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="https://instagram.com/kula" className="text-gray-600 hover:text-gray-900">Instagram</Link></li>
                <li><Link href="https://linkedin.com/company/kula" className="text-gray-600 hover:text-gray-900">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
          <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Kula. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}