import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import data from '@/data/mockDashboard.json';
import Link from 'next/link';

export function generateStaticParams() {
  const channels = (data as any).creator.channels as any[];
  return channels.map((c) => ({ id: String(c.id) }));
}

export default function ChannelPackages({ params }: { params: { id: string } }) {
  return (
    <RequireRole allowedRoles={['creator']}>
      <DashboardLayout>
      <section className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold">Pacotes do Canal #{params.id}</h1>
        <div className="mt-6 space-y-3">
          <Link
            href={`/channels/${params.id}/packages/new`}
            className="inline-block text-sm px-3 py-2 border rounded-md hover:bg-gray-50"
          >
            Adicionar Pacote
          </Link>
          <div className="rounded-2xl border bg-white p-4">
            <p className="font-semibold">Post Simples</p>
            <p className="text-sm text-gray-600">1 publicação no feed</p>
            <div className="mt-3 flex gap-2">
              <button className="text-sm px-3 py-1 border rounded-md">Editar</button>
              <button className="text-sm px-3 py-1 border rounded-md">Apagar</button>
            </div>
          </div>
          <div className="rounded-2xl border bg-white p-4">
            <p className="font-semibold">Post + 24h Status</p>
            <p className="text-sm text-gray-600">Publicação + status por 24h</p>
            <div className="mt-3 flex gap-2">
              <button className="text-sm px-3 py-1 border rounded-md">Editar</button>
              <button className="text-sm px-3 py-1 border rounded-md">Apagar</button>
            </div>
          </div>
        </div>
      </section>
      </DashboardLayout>
    </RequireRole>
  );
}




