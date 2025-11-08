import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const channels = [
  { id: 1, name: 'MozHumor', platform: 'WhatsApp', owner: 'João Silva', followers: 12000, status: 'verificado' },
  { id: 2, name: 'ModaMaputo', platform: 'Instagram', owner: 'Maria Santos', followers: 15000, status: 'verificado' },
  { id: 3, name: 'TechMoz', platform: 'YouTube', owner: 'Pedro Costa', followers: 8000, status: 'pendente' },
];

export default function AdminChannels() {
  return (
    <RequireRole allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Canais</h1>
            <p className="text-gray-600 mt-1">Aprove canais, verifique documentação e acompanhe a performance</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Canais em Revisão</CardTitle>
              <CardDescription>Analise solicitações e mantenha o marketplace confiável</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {channels.map((channel) => (
                <div key={channel.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-500">ID #{channel.id}</p>
                      <h3 className="font-semibold text-sm text-gray-900">{channel.name}</h3>
                      <p className="text-sm text-gray-600">Plataforma: {channel.platform}</p>
                      <p className="text-sm text-gray-500">Proprietário: {channel.owner}</p>
                      <p className="text-sm text-gray-500">Seguidores: {channel.followers.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={channel.status === 'verificado' ? 'default' : 'secondary'} className="capitalize flex items-center gap-1">
                        {channel.status === 'verificado' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {channel.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-auto">
                      <Button variant="outline" size="sm">Ver Perfil</Button>
                      {channel.status !== 'verificado' ? (
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Aprovar
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">Revogar</Button>
                      )}
                      <Button variant="destructive" size="sm" className="flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        Rejeitar
                      </Button>
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


