"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatMzn } from '@/lib/format';

type OrderStatus = 'pending' | 'active' | 'submitted' | 'completed' | 'disputed';

interface Order {
  id: number;
  channelName: string;
  packageTitle: string;
  price: number;
  status: OrderStatus;
  proofUrl?: string;
}

interface OrderDetailClientProps {
  id: number;
}

export default function OrderDetailClient({ id }: OrderDetailClientProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [proof, setProof] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('kula_orders');
    const list: Order[] = raw ? JSON.parse(raw) : [];
    let current = list.find((o) => o.id === id);

    if (!current) {
      current = {
        id,
        channelName: 'MozHumor',
        packageTitle: 'Post Simples',
        price: 100,
        status: 'pending',
      };
      localStorage.setItem('kula_orders', JSON.stringify([...list, current]));
    }

    setOrder(current);
  }, [id]);

  const update = (patch: Partial<Order>) => {
    setOrder((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch } as Order;
      const raw = localStorage.getItem('kula_orders');
      const list: Order[] = raw ? JSON.parse(raw) : [];
      const mapped = list.map((o) => (o.id === next.id ? next : o));
      localStorage.setItem('kula_orders', JSON.stringify(mapped));
      return next;
    });
  };

  if (!order) {
    return null;
  }

  return (
    <RequireRole allowedRoles={['creator', 'advertiser', 'admin']}>
      <DashboardLayout>
        <section className="max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold">Pedido #{order.id}</h1>
          <p className="text-gray-600">
            {order.channelName} • {order.packageTitle} • {formatMzn(order.price)}
          </p>
          <div className="mt-6 rounded-2xl border bg-white p-5 space-y-4">
            <p className="text-sm text-gray-600">
              Estado: <span className="font-medium capitalize">{order.status}</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => update({ status: 'active' })}>
                Aceitar (Criador)
              </Button>
              <Button variant="outline" onClick={() => update({ status: 'pending' })}>
                Recusar (Criador)
              </Button>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="proof">Prova (link)</Label>
                <Input
                  id="proof"
                  placeholder="URL do post/screenshot"
                  value={proof}
                  onChange={(event) => setProof(event.target.value)}
                />
                <Button
                  className="btn-gradient"
                  onClick={() => update({ status: 'submitted', proofUrl: proof })}
                >
                  Enviar Prova (Criador)
                </Button>
              </div>
              <Button variant="outline" onClick={() => update({ status: 'completed' })}>
                Aprovar & Liberar (Anunciante)
              </Button>
              <Button variant="outline" onClick={() => update({ status: 'disputed' })}>
                Abrir Disputa (Anunciante)
              </Button>
            </div>
          </div>
        </section>
      </DashboardLayout>
    </RequireRole>
  );
}



