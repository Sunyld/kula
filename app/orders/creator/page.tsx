import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import data from '@/data/mockDashboard.json';
import Link from 'next/link';
import { formatMzn } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardList, Clock } from 'lucide-react';

export default function CreatorOrders() {
  const { creator } = data as any;
  return (
    <RequireRole allowedRoles={['creator']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pedidos (Criador)</h1>
            <p className="text-gray-600 mt-1">Acompanhe encomendas em andamento e entregas futuras</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pedidos Ativos</CardTitle>
              <CardDescription>Pedidos que exigem a sua atenção</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {creator.activeOrders.map((order: any) => (
                <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">ID #{order.id}</p>
                      <h3 className="font-semibold text-sm text-gray-900">{order.channel}</h3>
                      <p className="text-sm text-gray-600">{order.package}</p>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                      <Clock className="h-3 w-3" />
                      Entrega em {order.dueIn}
                    </Badge>
                    <div className="text-right ml-auto">
                      <p className="text-sm text-gray-500">Valor</p>
                      <p className="font-semibold text-gray-900">{formatMzn(order.price)}</p>
                    </div>
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <ClipboardList className="h-4 w-4" />
                        Gerir Pedido
                      </Button>
                    </Link>
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


