import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import data from '@/data/mockDashboard.json';
import Link from 'next/link';
import { formatMzn } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

export default function AdvertiserOrders() {
  const { advertiser } = data as any;
  return (
    <RequireRole allowedRoles={['advertiser']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pedidos (Anunciante)</h1>
            <p className="text-gray-600 mt-1">Acompanhe status de campanhas e consumo de saldo</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campanhas Ativas</CardTitle>
              <CardDescription>Resumo das suas campanhas e pedidos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {advertiser.campaigns.map((campaign: any) => (
                <div key={campaign.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Pedido #{campaign.id}</p>
                      <h3 className="font-semibold text-sm text-gray-900">{campaign.name}</h3>
                      <p className="text-sm text-gray-600">Canal: {campaign.channel}</p>
                    </div>
                    <Badge variant="secondary" className="capitalize flex items-center gap-1">
                      <ShoppingBag className="h-3 w-3" />
                      {campaign.status}
                    </Badge>
                    <div className="text-right ml-auto">
                      <p className="text-sm text-gray-500">Gasto</p>
                      <p className="font-semibold text-gray-900">{formatMzn(campaign.spend)}</p>
                    </div>
                    <Link href={`/orders/${campaign.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Ver Detalhes
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


