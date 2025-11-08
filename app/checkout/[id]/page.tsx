import channels from '@/data/mockChannels.json';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatMzn } from '@/lib/format';

export function generateStaticParams() {
  const list = channels as any[];
  return list.map((c) => ({ id: String(c.id) }));
}

export default async function Checkout({ params }: { params: Promise<{ id: string }> }) {
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
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
            <p className="text-gray-600 mt-1">{channel.name} — {channel.platform}</p>

            <div className="bg-white border rounded-2xl p-6 mt-6">
              <h2 className="font-semibold text-lg">Briefing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="copy">Texto / Copy</Label>
                  <Input id="copy" placeholder="Texto do anúncio" />
                </div>
                <div>
                  <Label htmlFor="notes">Notas</Label>
                  <Input id="notes" placeholder="Ex: publicar às 18h" />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="media">Link da Mídia (imagem/vídeo)</Label>
                <Input id="media" placeholder="URL da mídia" />
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-6 mt-6">
              <h2 className="font-semibold text-lg">Pagamento</h2>
              <p className="text-sm text-gray-600 mt-1">Preço base: {formatMzn(channel.priceFrom)} • Taxa Kula: {formatMzn(10)} • Total: {formatMzn(channel.priceFrom + 10)}</p>
              <div className="flex gap-3 mt-4">
                <Button variant="outline">M-Pesa</Button>
                <Button variant="outline">e-Mola</Button>
                <Button variant="outline">Visa</Button>
              </div>
              <a href={`/checkout/success`}>
                <Button className="btn-gradient w-full h-11 mt-6">Pagar e criar pedido</Button>
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}


