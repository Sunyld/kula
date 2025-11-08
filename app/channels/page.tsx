import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import data from '@/data/mockDashboard.json';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users as UsersIcon, Package, Edit3 } from 'lucide-react';

export default function Channels() {
  const { creator } = data as any;
  return (
    <RequireRole allowedRoles={['creator']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meus Canais</h1>
              <p className="text-gray-600 mt-1">Gerencie presença, pacotes e disponibilidade</p>
            </div>
            <Link href="/channels/new">
              <Button className="btn-gradient">Adicionar Canal</Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Canais</CardTitle>
              <CardDescription>Resumo dos canais registados no marketplace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {creator.channels.map((channel: any) => (
                <div key={channel.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-500">ID #{channel.id}</p>
                      <h3 className="font-semibold text-sm text-gray-900">{channel.name}</h3>
                      <p className="text-sm text-gray-600">{channel.platform}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <UsersIcon className="h-4 w-4" />
                          {channel.followers.toLocaleString()} seguidores
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          {channel.rating}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="capitalize">{channel.status ?? 'verificado'}</Badge>
                    <div className="flex flex-wrap gap-2 ml-auto">
                      <Link href={`/channels/${channel.id}/packages`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          Pacotes
                        </Button>
                      </Link>
                      <Link href={`/channels/${channel.id}/edit`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Edit3 className="h-4 w-4" />
                          Editar
                        </Button>
                      </Link>
                      <Link href={`/channels/${channel.id}/availability`}>
                        <Button variant="outline" size="sm">Disponibilidade</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </RequireRole>
  );
}


