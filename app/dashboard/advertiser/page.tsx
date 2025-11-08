'use client';

import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { formatMzn } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Wallet, 
  Clock, 
  ShoppingBag, 
  TrendingUp, 
  Heart, 
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockData = {
  availableBalance: 5000,
  escrowBalance: 1200,
  activeCampaigns: 3,
  totalSpent: 8500,
  favoriteChannels: 5,
};

const mockCampaigns = [
  { 
    id: 301, 
    name: 'Lançamento Coleção Verão', 
    channel: 'ModaMaputo', 
    status: 'em_andamento', 
    spend: 240,
    progress: 75,
    endDate: '2024-01-20'
  },
  { 
    id: 302, 
    name: 'Promo Novembro', 
    channel: 'DicasDeLuanda', 
    status: 'aguardando_prova', 
    spend: 80,
    progress: 50,
    endDate: '2024-01-18'
  },
  { 
    id: 303, 
    name: 'Campanha Black Friday', 
    channel: 'MozHumor', 
    status: 'concluida', 
    spend: 350,
    progress: 100,
    endDate: '2024-01-10'
  },
];

const mockFavorites = [
  { id: 1, name: 'MozHumor', platform: 'WhatsApp', rating: 4.8, followers: 12000 },
  { id: 2, name: 'DicasDeLuanda', platform: 'TikTok', rating: 4.6, followers: 8500 },
  { id: 3, name: 'ModaMaputo', platform: 'Instagram', rating: 4.9, followers: 15000 },
];

export default function AdvertiserDashboard() {
  return (
    <RequireRole allowedRoles={['advertiser']}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard do Anunciante</h1>
            <p className="text-gray-600 mt-1">Acompanhe suas campanhas, saldos e canais favoritos</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatMzn(mockData.availableBalance)}</div>
                <p className="text-xs text-muted-foreground mt-1">Pronto para campanhas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo em Escrow</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatMzn(mockData.escrowBalance)}</div>
                <p className="text-xs text-muted-foreground mt-1">Em pedidos ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockData.activeCampaigns}</div>
                <p className="text-xs text-muted-foreground mt-1">Em andamento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gasto Total</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatMzn(mockData.totalSpent)}</div>
                <p className="text-xs text-muted-foreground mt-1">Em todas as campanhas</p>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns and Favorites */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Campaigns */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Campanhas Ativas</CardTitle>
                    <CardDescription>Suas campanhas em andamento</CardDescription>
                  </div>
                  <Link href="/orders/advertiser">
                    <Button variant="ghost" size="sm">Ver todas</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCampaigns.map((campaign) => (
                    <div key={campaign.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{campaign.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{campaign.channel}</p>
                        </div>
                        <Badge 
                          variant={
                            campaign.status === 'concluida' ? 'default' : 
                            campaign.status === 'em_andamento' ? 'secondary' : 
                            'outline'
                          }
                          className="text-xs"
                        >
                          {campaign.status === 'concluida' ? 'Concluída' : 
                           campaign.status === 'em_andamento' ? 'Em Andamento' : 
                           'Aguardando'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Gasto: {formatMzn(campaign.spend)}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-[var(--kula-primary)] h-2 rounded-full transition-all"
                              style={{ width: `${campaign.progress}%` }}
                            />
                          </div>
                        </div>
                        <Link href={`/orders/${campaign.id}`}>
                          <Button variant="ghost" size="sm">Ver</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Favorite Channels */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Canais Favoritos</CardTitle>
                    <CardDescription>Seus canais salvos</CardDescription>
                  </div>
                  <Link href="/favorites">
                    <Button variant="ghost" size="sm">Ver todos</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFavorites.map((channel) => (
                    <Link key={channel.id} href={`/channel/${channel.id}`}>
                      <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-sm">{channel.name}</h3>
                              <Badge variant="outline" className="text-xs">{channel.platform}</Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{channel.rating}</span>
                              </div>
                              <span className="text-xs text-gray-500">{channel.followers.toLocaleString()} seguidores</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Ver</Button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {mockFavorites.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum canal favorito ainda</p>
                    <Link href="/marketplace">
                      <Button variant="outline" size="sm" className="mt-4">Explorar Marketplace</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/marketplace">
                  <Button variant="outline" className="w-full h-auto flex-col py-4">
                    <ShoppingBag className="h-6 w-6 mb-2" />
                    <span>Explorar Canais</span>
                  </Button>
                </Link>
                <Link href="/wallet">
                  <Button variant="outline" className="w-full h-auto flex-col py-4">
                    <Wallet className="h-6 w-6 mb-2" />
                    <span>Minha Carteira</span>
                  </Button>
                </Link>
                <Link href="/favorites">
                  <Button variant="outline" className="w-full h-auto flex-col py-4">
                    <Heart className="h-6 w-6 mb-2" />
                    <span>Favoritos</span>
                  </Button>
                </Link>
                <Link href="/orders/advertiser">
                  <Button variant="outline" className="w-full h-auto flex-col py-4">
                    <CheckCircle2 className="h-6 w-6 mb-2" />
                    <span>Meus Pedidos</span>
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
