'use client';

import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function NewDispute() {
  return (
    <RequireRole allowedRoles={['advertiser', 'creator']}>
      <DashboardLayout>
        <div className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Abrir Disputa</h1>
        <form className="space-y-6">
          <div>
            <Label htmlFor="order">ID do Pedido</Label>
            <Input id="order" placeholder="Ex: 102" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="reason">Motivo</Label>
            <Input id="reason" placeholder="Anúncio não foi publicado" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="details">Detalhes</Label>
            <Textarea 
              id="details" 
              placeholder="Explique o problema em detalhes..." 
              className="mt-1 min-h-[120px]"
            />
          </div>
          <Button className="btn-gradient">Enviar Disputa</Button>
        </form>
      </div>
      </DashboardLayout>
    </RequireRole>
  );
}
