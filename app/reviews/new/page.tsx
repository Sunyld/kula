'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function NewReview() {
  const sp = useSearchParams();
  const orderId = sp.get('order');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  return (
    <DashboardLayout>
      <section className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold">Deixar Avaliação</h1>
        <p className="text-gray-600">Pedido #{orderId || '-'}</p>
        <form className="mt-6 space-y-4" onSubmit={(e)=>{e.preventDefault(); alert('Avaliação enviada!');}}>
          <div>
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input id="rating" type="number" min={1} max={5} value={rating} onChange={(e)=>setRating(Number(e.target.value))} />
          </div>
          <div>
            <Label htmlFor="comment">Comentário</Label>
            <textarea id="comment" className="w-full border rounded-md px-3 py-2 h-28" value={comment} onChange={(e)=>setComment(e.target.value)} />
          </div>
          <Button className="btn-gradient">Enviar</Button>
        </form>
      </section>
    </DashboardLayout>
  );
}


