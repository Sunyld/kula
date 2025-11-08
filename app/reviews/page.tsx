'use client';

import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const mockReviews = [
  { id: 1, from: 'Loja Azul', to: 'MozHumor', rating: 5, comment: 'Entrega rápida e boa audiência.', date: '2024-01-15' },
  { id: 2, from: 'Moda X', to: 'ModaMaputo', rating: 4, comment: 'Bom alcance, voltaremos a contratar.', date: '2024-01-10' },
  { id: 3, from: 'TechStore', to: 'MozHumor', rating: 5, comment: 'Excelente profissionalismo e resultados.', date: '2024-01-08' },
];

export default function Reviews() {
  return (
    <RequireRole allowedRoles={['advertiser', 'creator']}>
      <DashboardLayout>
        <div className="max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Avaliações</h1>
        <div className="space-y-4">
          {mockReviews.map((r) => (
            <Card key={r.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{r.from} → {r.to}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{r.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < r.rating
                            ? 'fill-amber-500 text-amber-500'
                            : 'fill-gray-200 text-gray-200'
                        )}
                      />
                    ))}
                    <span className="ml-1 text-sm font-medium">{r.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{r.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      </DashboardLayout>
    </RequireRole>
  );
}
