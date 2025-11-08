import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CheckoutSuccess() {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen px-6 md:px-20 mt-16 py-10 text-center">
        <h1 className="text-3xl font-bold">Pedido criado com sucesso 🎉</h1>
        <p className="text-gray-600 mt-2">O pagamento foi colocado em escrow. Acompanhe o status nos seus pedidos.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link href="/orders/advertiser"><Button variant="outline">Ver pedidos</Button></Link>
          <Link href="/"><Button className="btn-gradient">Voltar ao início</Button></Link>
        </div>
      </section>
    </main>
  );
}




