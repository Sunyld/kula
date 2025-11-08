'use client';

import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { formatMzn } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Users, 
  MessageSquare, 
  AlertCircle, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  XCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockStats = {
  totalUsers: 1243,
  verifiedChannels: 87,
  pendingChannels: 5,
  ordersInEscrow: 56,
  monthlyRevenue: 3420,
  activeDisputes: 2,
  resolvedDisputes: 15,
  userGrowth: 12.5,
  revenueGrowth: 8.3,
};

const mockRecentDisputes = [
  { id: 531, orderId: 302, reason: 'Anúncio não publicado', status: 'em_analise', createdAt: '2024-01-15' },
  { id: 532, orderId: 298, reason: 'Conteúdo incorreto', status: 'resolvida', createdAt: '2024-01-14' },
  { id: 533, orderId: 305, reason: 'Publicado e removido', status: 'em_analise', createdAt: '2024-01-13' },
];

const mockPendingChannels = [
  { id: 101, name: 'MozHumor', platform: 'WhatsApp', owner: 'João Silva', submittedAt: '2024-01-15' },
  { id: 102, name: 'NovoCanal', platform: 'TikTok', owner: 'Maria Santos', submittedAt: '2024-01-14' },
  { id: 103, name: 'TechMoz', platform: 'Instagram', owner: 'Pedro Costa', submittedAt: '2024-01-13' },
];

export default function AdminDashboard() {
  return (
    <RequireRole allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Visão Geral do Sistema</h1>
            <p className="text-gray-600 mt-1">Gerencie utilizadores, canais, disputas e métricas da plataforma</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Utilizadores</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>{mockStats.userGrowth}% este mês</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Canais Verificados</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.verifiedChannels}</div>
                <div className="flex items-center text-xs text-orange-600 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{mockStats.pendingChannels} pendentes</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos em Escrow</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.ordersInEscrow}</div>
                <p className="text-xs text-muted-foreground mt-1">Aguardando conclusão</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatMzn(mockStats.monthlyRevenue)}</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>{mockStats.revenueGrowth}% vs mês anterior</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Disputes and Pending Channels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Disputes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Disputas Recentes</CardTitle>
                    <CardDescription>Últimas disputas abertas no sistema</CardDescription>
                  </div>
                  <Link href="/admin/disputes">
                    <Button variant="ghost" size="sm">Ver todas</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentDisputes.map((dispute) => (
                    <div key={dispute.id} className="flex items-start justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">#{dispute.orderId}</span>
                          <Badge variant={dispute.status === 'resolvida' ? 'default' : 'secondary'} className="text-xs">
                            {dispute.status === 'resolvida' ? 'Resolvida' : 'Em Análise'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{dispute.reason}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(dispute.createdAt).toLocaleDateString('pt-MZ')}</p>
                      </div>
                      <Link href={`/admin/disputes/${dispute.id}`}>
                        <Button variant="ghost" size="sm">Ver</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Channels */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Canais Pendentes</CardTitle>
                    <CardDescription>Canais aguardando verificação</CardDescription>
                  </div>
                  <Link href="/admin/channels">
                    <Button variant="ghost" size="sm">Ver todos</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPendingChannels.map((channel) => (
                    <div key={channel.id} className="flex items-start justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{channel.name}</span>
                          <Badge variant="outline" className="text-xs">{channel.platform}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Por: {channel.owner}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(channel.submittedAt).toLocaleDateString('pt-MZ')}</p>
                      </div>
                      <Link href={`/admin/channels?status=pending&id=${channel.id}`}>
                        <Button variant="default" size="sm">Revisar</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Navegue rapidamente para seções importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/admin/users">
                  <Button variant="outline" className="w-full h-auto flex-col py-4">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Utilizadores</span>
                  </Button>
                </Link>
                <Link href="/admin/channels">
                  <Button variant="outline" className="w-full h-auto flex-col py-4">
                    <MessageSquare className="h-6 w-6 mb-2" />
                    <span>Canais</span>
                  </Button>
                </Link>
                <Link href="/admin/disputes">
                  <Button variant="outline" className="w-full h-auto flex-col py-4">
                    <AlertCircle className="h-6 w-6 mb-2" />
                    <span>Disputas</span>
                  </Button>
                </Link>
                <Link href="/admin/reviews">
                  <Button variant="outline" className="w-full h-auto flex-col py-4">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    <span>Avaliações</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </RequireRole>
  );
}
