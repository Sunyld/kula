import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Flag, ShieldCheck } from 'lucide-react';

const reviews = [
  { id: 1, channel: 'MozHumor', reviewer: 'Loja X', rating: 5, comment: 'Excelente experiência, audiência muito engajada.', flagged: false },
  { id: 2, channel: 'ModaMaputo', reviewer: 'Agência Y', rating: 4, comment: 'Bom alcance, entregou no prazo.', flagged: false },
  { id: 3, channel: 'TechMoz', reviewer: 'Startup Z', rating: 2, comment: 'Conteúdo diferente do briefing.', flagged: true },
];

export default function AdminReviews() {
  return (
    <RequireRole allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Avaliações</h1>
            <p className="text-gray-600 mt-1">Modere feedbacks entre anunciantes e criadores</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Avaliações Recentes</CardTitle>
              <CardDescription>Analise e tome ações sobre avaliações reportadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-gray-900">{review.channel}</h3>
                        <Badge variant={review.flagged ? 'destructive' : 'secondary'} className="flex items-center gap-1 text-xs">
                          {review.flagged ? <Flag className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                          {review.flagged ? 'Reportada' : 'Publicada'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">Por {review.reviewer}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        {review.rating} de 5
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">Ocultar</Button>
                      <Button variant="outline" size="sm">Remover</Button>
                      {review.flagged && (
                        <Button variant="destructive" size="sm">Rever disputa</Button>
                      )}
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


