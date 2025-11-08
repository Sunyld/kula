'use client';

import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { formatMzn } from '@/lib/format';
import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Wallet,
  Clock,
  ClipboardList,
  Megaphone,
  Star,
  Calendar as CalendarIcon,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

const mockData = {
  availableBalance: 420,
  escrowBalance: 260,
  totalOrders: 18,
  activeCampaigns: 4,
  responseRate: 98,
  rating: 4.9,
};

const mockActiveOrders = [
  { id: 101, channel: 'MozHumor', package: 'Post + Status 24h', price: 150, dueIn: '1 dia', status: 'em_andamento' },
  { id: 102, channel: 'ModaMaputo', package: 'Post Simples', price: 120, dueIn: '2 dias', status: 'aguardando_feedback' },
  { id: 103, channel: 'DicasDeLuanda', package: 'Vídeo Curto', price: 200, dueIn: '3 dias', status: 'em_andamento' },
];

const mockChannels = [
  { id: 1, name: 'MozHumor', platform: 'WhatsApp', followers: 12000, rating: 4.8, status: 'verificado' },
  { id: 3, name: 'ModaMaputo', platform: 'Instagram', followers: 15000, rating: 4.9, status: 'verificado' },
  { id: 4, name: 'TechMoz', platform: 'YouTube', followers: 8000, rating: 4.7, status: 'pendente' },
];

export default function CreatorDashboard() {
  return (
    <RequireRole allowedRoles={['creator']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard do Criador</h1>
            <p className="text-gray-600 mt-1">Acompanhe pedidos, canais e métricas de performance</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Saldo Disponível"
              value={formatMzn(mockData.availableBalance)}
              icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
              helper="+12% vs mês anterior"
              helperTone="positive"
            />
            <MetricCard
              label="Saldo em Escrow"
              value={formatMzn(mockData.escrowBalance)}
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
              helper="Aguardando aprovação"
            />
            <MetricCard
              label="Pedidos Concluídos"
              value={mockData.totalOrders}
              icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
              helper="+3 este mês"
              helperTone="positive"
            />
            <MetricCard
              label="Classificação Média"
              value={mockData.rating}
              icon={<Star className="h-4 w-4 text-muted-foreground" />}
              helper="Baseado em 54 avaliações"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Pedidos Ativos</CardTitle>
                    <CardDescription>Pedidos que requerem ação imediata</CardDescription>
                  </div>
                  <Link href="/orders/creator">
                    <Button variant="ghost" size="sm">Ver todos</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActiveOrders.map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-sm">{order.channel}</h3>
                          <p className="text-sm text-gray-600">{order.package}</p>
                        </div>
                        <Badge
                          variant={
                            order.status === 'em_andamento' ? 'secondary' : 'outline'
                          }
                          className="text-xs"
                        >
                          {order.status === 'em_andamento' ? 'Em andamento' : 'Aguardando feedback'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Entrega em {order.dueIn}</p>
                          <p className="text-sm font-semibold mt-1">{formatMzn(order.price)}</p>
                        </div>
                        <Link href={`/orders/${order.id}`}>
                          <Button variant="ghost" size="sm">Gerir</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Meus Canais</CardTitle>
                    <CardDescription>Performance dos seus canais</CardDescription>
                  </div>
                  <Link href="/channels">
                    <Button variant="ghost" size="sm">Gerir canais</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockChannels.map((channel) => (
                    <div key={channel.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-sm">{channel.name}</h3>
                          <p className="text-xs text-gray-500">{channel.platform}</p>
                          <p className="text-sm text-gray-600 mt-2">{channel.followers.toLocaleString()} seguidores</p>
                        </div>
                        <Badge variant={channel.status === 'verificado' ? 'default' : 'outline'} className="text-xs">
                          {channel.status === 'verificado' ? 'Verificado' : 'Pendente'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {channel.rating}
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/channels/${channel.id}/edit`}>
                            <Button variant="ghost" size="sm">Editar</Button>
                          </Link>
                          <Link href={`/channels/${channel.id}/packages`}>
                            <Button variant="ghost" size="sm">Pacotes</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Fluxos principais para o criador</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/channels/new">
                  <Button variant="outline" className="w-full h-auto flex-col py-4">
                    <Megaphone className="h-6 w-6 mb-2" />
                    <span>Novo Canal</span>
                  </Button>
                </Link>
                <Link href="/channels">
                  <Button variant="outline" className="w-full h-auto flex-col py-4">
                    <CalendarIcon className="h-6 w-6 mb-2" />
                    <span>Disponibilidade</span>
                  </Button>
                </Link>
                <Link href="/wallet">
                  <Button variant="outline" className="w-full h-auto flex-col py-4">
                    <Wallet className="h-6 w-6 mb-2" />
                    <span>Carteira</span>
                  </Button>
                </Link>
                <Link href="/orders/creator">
                  <Button variant="outline" className="w-full h-auto flex-col py-4">
                    <ClipboardList className="h-6 w-6 mb-2" />
                    <span>Pedidos</span>
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

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  helper?: string;
  helperTone?: 'positive' | 'negative';
}

function MetricCard({ label, value, icon, helper, helperTone }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {helper && (
          <p
            className={
              helperTone === 'positive'
                ? 'text-xs text-green-600 mt-1 flex items-center gap-1'
                : helperTone === 'negative'
                  ? 'text-xs text-red-600 mt-1 flex items-center gap-1'
                  : 'text-xs text-muted-foreground mt-1'
            }
          >
            {helperTone === 'positive' && <ArrowUpRight className="h-3 w-3" />}
            {helperTone === 'negative' && <ArrowUpRight className="h-3 w-3 rotate-90" />}
            {helper}
          </p>
        )}
      </CardContent>
    </Card>
  );
}


