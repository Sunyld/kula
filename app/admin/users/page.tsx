import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, AlertTriangle } from 'lucide-react';

const users = [
  { id: 1, name: 'Admin Master', email: 'admin@kula.dev', role: 'admin', status: 'active' },
  { id: 2, name: 'João Criador', email: 'creator@kula.dev', role: 'creator', status: 'active' },
  { id: 3, name: 'Maria Anunciante', email: 'advertiser@kula.dev', role: 'advertiser', status: 'active' },
  { id: 4, name: 'Pedro Criador', email: 'pedro@kula.dev', role: 'creator', status: 'pending' },
];

export default function AdminUsers() {
  return (
    <RequireRole allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestão de Utilizadores</h1>
              <p className="text-gray-600 mt-1">Acompanhe perfis e níveis de acesso da plataforma</p>
            </div>
            <Button className="btn-gradient">Convidar Utilizador</Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lista de Utilizadores</CardTitle>
                  <CardDescription>Perfis registados na plataforma Kula</CardDescription>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {users.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-sm text-gray-500">ID #{user.id}</p>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={user.role === 'admin' ? 'default' : 'outline'} className="capitalize">
                      {user.role}
                    </Badge>
                    <Badge variant={user.status === 'active' ? 'secondary' : 'outline'} className="capitalize">
                      {user.status === 'active' ? 'Ativo' : 'Pendente'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      Promover
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      Bloquear
                    </Button>
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


