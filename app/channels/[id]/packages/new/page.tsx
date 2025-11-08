import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import channels from '@/data/mockChannels.json';

export function generateStaticParams() {
  const list = channels as any[];
  return list.map((channel) => ({ id: String(channel.id) }));
}

export default function NewPackage({ params }: { params: { id: string } }) {
  return (
    <RequireRole allowedRoles={['creator']}>
      <DashboardLayout>
      <section className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold">Novo Pacote — Canal #{params.id}</h1>
        <form className="mt-6 space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" placeholder="Post Simples, Pacote Semanal..." />
          </div>
          <div>
            <Label htmlFor="desc">Descrição</Label>
            <textarea id="desc" className="w-full border rounded-md px-3 py-2 h-28" placeholder="O que o anunciante recebe" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Preço</Label>
              <Input id="price" type="number" placeholder="100" />
            </div>
            <div>
              <Label htmlFor="eta">Tempo de entrega</Label>
              <Input id="eta" placeholder="1 dia, 2 dias..." />
            </div>
          </div>
          <Button className="btn-gradient">Guardar Pacote</Button>
        </form>
      </section>
      </DashboardLayout>
    </RequireRole>
  );
}


