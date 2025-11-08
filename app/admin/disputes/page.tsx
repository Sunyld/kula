import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

const disputes = [
  { id: 531, orderId: 302, status: 'em_analise', summary: 'Anunciante relata não publicação.' },
  { id: 532, orderId: 298, status: 'resolvida', summary: 'Pagamento liberado após prova.' },
  { id: 533, orderId: 305, status: 'pendente', summary: 'Criador enviou conteúdo fora do briefing.' },
];

export default function AdminDisputes() {
  return (
    <RequireRole allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Disputas</h1>
            <p className="text-gray-600 mt-1">Resolução de conflitos entre criadores e anunciantes</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tickets Recentes</CardTitle>
              <CardDescription>Acompanhe o estado das disputas abertas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {disputes.map((dispute) => (
                <div key={dispute.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Ticket #{dispute.id}</p>
                      <h3 className="font-semibold text-sm text-gray-900">Pedido #{dispute.orderId}</h3>
                      <p className="text-sm text-gray-600 mt-1">{dispute.summary}</p>
                    </div>
                    <Badge
                      variant={
                        dispute.status === 'resolvida' ? 'default' : dispute.status === 'em_analise' ? 'secondary' : 'outline'
                      }
                      className="capitalize flex items-center gap-1"
                    >
                      {dispute.status === 'resolvida' ? <CheckCircle2 className="h-3 w-3" /> : dispute.status === 'em_analise' ? <Clock className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                      {dispute.status.replace('_', ' ')}
                    </Badge>
                    <div className="flex items-center gap-2 ml-auto">
                      <Link href={`/admin/disputes/${dispute.id}`}>
                        <Button variant="outline" size="sm">Detalhes</Button>
                      </Link>
                      <Button variant="ghost" size="sm">Atribuir</Button>
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


