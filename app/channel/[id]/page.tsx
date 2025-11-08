import channels from '@/data/mockChannels.json';
import Navbar from '@/components/Navbar';
import { CheckCircle2, Star } from 'lucide-react';
import { formatMzn } from '@/lib/format';
import FavoriteToggle from '@/components/FavoriteToggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function generateStaticParams() {
  const list = channels as any[];
  return list.map((c) => ({ id: String(c.id) }));
}

export default async function ChannelDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  const channel = (channels as any[]).find((c) => c.id === id);

  return (
    <main>
      <Navbar />
      <section className="min-h-screen px-6 md:px-20 mt-16 py-10">
        {!channel ? (
          <p>Canal não encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">{channel.name} {channel.rating >= 4.8 && <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-label="Verificado" />}</h1>
              <p className="text-gray-600 mt-1">Plataforma: {channel.platform} • Seguidores: {channel.followers.toLocaleString()}</p>

              <div className="mt-6 space-y-4">
                <h2 className="font-semibold text-lg">Portfólio</h2>
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-24 rounded-lg bg-gray-100" />
                  <div className="h-24 rounded-lg bg-gray-100" />
                  <div className="h-24 rounded-lg bg-gray-100" />
                </div>
                <h2 className="font-semibold text-lg">Pacotes de Anúncio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PackageCard title="Post Simples" desc="1 publicação no feed" price={channel.priceFrom} id={channel.id} />
                  <PackageCard title="Post + 24h Status" desc="Publicação + status por 24h" price={channel.priceFrom + 40} id={channel.id} />
                </div>
                <div className="mt-6">
                  <h2 className="font-semibold text-lg">Avaliações</h2>
                  <ul className="mt-3 space-y-3 text-sm text-gray-700">
                    <li className="border rounded-xl p-3 flex items-center gap-3">
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-amber-500" />
                        5
                      </span>
                      <span>"Entrega rápida e boa audiência."</span>
                    </li>
                    <li className="border rounded-xl p-3 flex items-center gap-3">
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-amber-500" />
                        4
                      </span>
                      <span>"Bom alcance"</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <aside className="bg-white border rounded-2xl p-5 h-fit">
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-xl font-semibold flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                {channel.rating.toFixed(1)}
              </p>
              <FavoriteToggle id={channel.id} />
              <Link href={`/checkout/${channel.id}`}>
                <Button className="btn-gradient w-full mt-3">Contratar a partir de {formatMzn(channel.priceFrom)}</Button>
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

function PackageCard({ title, desc, price, id }: { title: string; desc: string; price: number; id: number; }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="font-medium">{formatMzn(price)}</span>
        <Link href={`/checkout/${id}`}>
          <Button size="sm" className="btn-gradient">Contratar</Button>
        </Link>
      </div>
    </div>
  );
}

