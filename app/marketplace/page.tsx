'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import channels from '@/data/mockChannels.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import { formatMzn } from '@/lib/format';

type Channel = {
  id: number;
  name: string;
  platform: string;
  followers: number;
  priceFrom: number;
  rating: number;
};

export default function Marketplace() {
  const channelList = channels as Channel[];
  const [q, setQ] = useState('');
  const [platform, setPlatform] = useState('');
  const [niches, setNiches] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minFollowers, setMinFollowers] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('kula_user') || 'null');
      setIsLoggedIn(!!user);
      setUserRole(user?.role || null);
    }
  }, []);

  const idMeta: Record<number, { niches: string[]; locations: string[] }> = {
    1: { niches: ['Humor'], locations: ['Maputo'] },
    2: { niches: ['Dicas', 'Moda'], locations: ['Luanda'] },
    3: { niches: ['Moda'], locations: ['Maputo'] },
  };

  const filtered = useMemo(() => {
    return channelList.filter((c) =>
      (q ? c.name.toLowerCase().includes(q.toLowerCase()) : true) &&
      (platform ? c.platform === platform : true) &&
      (niches.length ? niches.every((n) => (idMeta[c.id]?.niches || []).includes(n)) : true) &&
      (locations.length ? locations.every((l) => (idMeta[c.id]?.locations || []).includes(l)) : true) &&
      (minPrice ? c.priceFrom >= Number(minPrice) : true) &&
      (maxPrice ? c.priceFrom <= Number(maxPrice) : true) &&
      (minFollowers ? c.followers >= Number(minFollowers) : true)
    );
  }, [channelList, q, platform, niches, locations, minPrice, maxPrice, minFollowers]);

  // Se está logado como anunciante, mostrar versão do dashboard
  if (isLoggedIn && userRole === 'advertiser') {
    return (
      <RequireRole allowedRoles={['advertiser']}>
        <DashboardLayout>
          <MarketplaceContent 
            filtered={filtered}
            q={q}
            setQ={setQ}
            platform={platform}
            setPlatform={setPlatform}
            niches={niches}
            setNiches={setNiches}
            locations={locations}
            setLocations={setLocations}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minFollowers={minFollowers}
            setMinFollowers={setMinFollowers}
          />
        </DashboardLayout>
      </RequireRole>
    );
  }

  // Versão pública (sem login necessário)
  return (
    <main>
      <Navbar />
      <section className="min-h-screen px-6 md:px-20 mt-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Explorar Canais</h1>
            <p className="text-gray-600 mb-4">Descubra canais e contrate com segurança.</p>
            {!isLoggedIn && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <Link href="/login" className="font-semibold underline">Faça login</Link> ou{' '}
                  <Link href="/register" className="font-semibold underline">crie uma conta</Link> para contratar canais.
                </p>
              </div>
            )}
          </div>

          <MarketplaceContent 
            filtered={filtered}
            q={q}
            setQ={setQ}
            platform={platform}
            setPlatform={setPlatform}
            niches={niches}
            setNiches={setNiches}
            locations={locations}
            setLocations={setLocations}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minFollowers={minFollowers}
            setMinFollowers={setMinFollowers}
            isPublic={true}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}

interface MarketplaceContentProps {
  filtered: Channel[];
  q: string;
  setQ: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
  niches: string[];
  setNiches: (value: string[] | ((prev: string[]) => string[])) => void;
  locations: string[];
  setLocations: (value: string[] | ((prev: string[]) => string[])) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  minFollowers: string;
  setMinFollowers: (value: string) => void;
  isPublic?: boolean;
}

function MarketplaceContent({
  filtered,
  q,
  setQ,
  platform,
  setPlatform,
  niches,
  setNiches,
  locations,
  setLocations,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minFollowers,
  setMinFollowers,
  isPublic = false
}: MarketplaceContentProps) {
  return (
    <>
      <div className="rounded-xl border bg-white p-3 md:p-4 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          <input
            className="h-9 text-sm rounded-md border px-3"
            placeholder="Pesquisar por nome..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="h-9 text-sm rounded-md border px-3" value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="">Plataforma</option>
            <option>WhatsApp</option>
            <option>TikTok</option>
            <option>Instagram</option>
          </select>
          <input className="h-9 text-sm rounded-md border px-3" placeholder="Preço min" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} />
          <input className="h-9 text-sm rounded-md border px-3" placeholder="Preço max" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} />
          <input className="h-9 text-sm rounded-md border px-3 lg:col-span-1 sm:col-span-2" placeholder="Seguidores min" value={minFollowers} onChange={(e)=>setMinFollowers(e.target.value)} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Humor','Moda','Dicas'].map((n) => (
            <button 
              key={n} 
              onClick={() => setNiches((p)=> p.includes(n) ? p.filter(x=>x!==n) : [...p,n])} 
              className={`px-3 h-8 rounded-full text-xs border ${niches.includes(n) ? 'bg-[--kula-secondary] text-white' : 'bg-white hover:bg-gray-50'}`}
            >
              {n}
            </button>
          ))}
          {['Maputo','Luanda'].map((l) => (
            <button 
              key={l} 
              onClick={() => setLocations((p)=> p.includes(l) ? p.filter(x=>x!==l) : [...p,l])} 
              className={`px-3 h-8 rounded-full text-xs border ${locations.includes(l) ? 'bg-[--kula-secondary] text-white' : 'bg-white hover:bg-gray-50'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-sm text-gray-500 border rounded-2xl bg-white p-10">
            Nenhum canal encontrado com os filtros selecionados.
          </div>
        )}
        {filtered.map((c) => (
          <div key={c.id} className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-[--kula-primary] to-[--kula-secondary] shadow-sm">
            <div className="rounded-2xl bg-white p-6 h-full flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-1">
                    {c.name} {c.rating >= 4.8 && <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-label="Verificado" />}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5">{c.platform}</span>
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 gap-1 text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-amber-500" />
                      {c.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[--kula-primary] to-[--kula-secondary] opacity-80 group-hover:opacity-100 transition-all"></div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{c.followers.toLocaleString()} seguidores</span>
                <span className="font-medium text-gray-900">A partir de {formatMzn(c.priceFrom)}</span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <Link href={`/channel/${c.id}`}>
                  <Button variant="outline">Ver perfil</Button>
                </Link>
                {isPublic ? (
                  <Link href="/login">
                    <Button className="btn-gradient">Contratar</Button>
                  </Link>
                ) : (
                  <Link href={`/checkout/${c.id}`}>
                    <Button className="btn-gradient">Contratar</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
