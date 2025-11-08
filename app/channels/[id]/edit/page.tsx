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

export default function EditChannel({ params }: { params: { id: string } }) {
  return (
    <RequireRole allowedRoles={['creator']}>
      <DashboardLayout>
      <section className="w-full">
        <h1 className="text-2xl md:text-3xl font-bold">Editar Canal #{params.id}</h1>
        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="platform">Plataforma</Label>
            <select id="platform" className="w-full border rounded-md h-10 px-3">
              <option>WhatsApp</option>
              <option>TikTok</option>
              <option>Instagram</option>
              <option>Facebook</option>
            </select>
          </div>
          <div>
            <Label htmlFor="name">Nome do Canal</Label>
            <Input id="name" defaultValue="MozHumor" />
          </div>
          <div>
            <Label htmlFor="link">Link do Canal</Label>
            <Input id="link" defaultValue="https://wa.me/xxx" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="niche">Nicho</Label>
            <Input id="niche" defaultValue="Humor" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="location">Localização do Público</Label>
            <Input id="location" defaultValue="Maputo" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">Descrição</Label>
            <textarea id="description" className="w-full border rounded-md px-3 py-2 h-28" defaultValue="Canal de humor moçambicano" />
          </div>
          <div className="md:col-span-2 mt-2">
            <Button className="btn-gradient">Guardar Alterações</Button>
          </div>
        </form>
      </section>
      </DashboardLayout>
    </RequireRole>
  );
}


