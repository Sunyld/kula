"use client";

import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import channels from '@/data/mockChannels.json';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Favorites() {
  const list = channels as any[];
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('kula_favorites');
    setIds(raw ? JSON.parse(raw) : []);
  }, []);

  const favs = list.filter((c) => ids.includes(c.id));

  return (
    <RequireRole allowedRoles={['advertiser']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Canais Favoritos</h1>
              <p className="text-gray-600 mt-1">Guarde canais estratégicos para futuras campanhas</p>
            </div>
            <Link href="/marketplace">
              <Button variant="outline" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Explorar Marketplace
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Favoritos</CardTitle>
              <CardDescription>Organize e acione rapidamente canais de confiança</CardDescription>
            </CardHeader>
            <CardContent>
              {favs.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Heart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Ainda não tem canais favoritos.</p>
                  <Link href="/marketplace">
                    <Button variant="outline" size="sm" className="mt-4">Descobrir Canais</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {favs.map((channel: any) => (
                    <Card key={channel.id} className="border shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center justify-between">
                          <span>{channel.name}</span>
                          <Badge variant="secondary">{channel.platform}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          {channel.rating.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="flex-1" asChild>
                            <Link href={`/channel/${channel.id}`}>Ver Canal</Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              const updated = ids.filter((id) => id !== channel.id);
                              localStorage.setItem('kula_favorites', JSON.stringify(updated));
                              setIds(updated);
                            }}
                          >
                            Remover
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </RequireRole>
  );
}




