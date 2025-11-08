import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

const dispute = {
  orderId: 302,
  channel: 'MozHumor',
  advertiser: 'Loja X',
  creator: 'João Criador',
  status: 'em análise',
  summary: 'Anunciante afirma que o conteúdo não foi publicado conforme briefing.',
  evidenceAdvertiser: 'Captura de ecrã do briefing e ausência do post.',
  evidenceCreator: 'Comprovativo de publicação parcial.',
};

export default function AdminDisputeDetail({ params }: { params: { id: string } }) {
  return (
    <RequireRole allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Disputa #{params.id}</h1>
              <p className="text-gray-600 mt-1">Analise o caso e defina a resolução adequada</p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {dispute.status}
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumo do Caso</CardTitle>
              <CardDescription>Detalhes gerais do pedido em disputa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-700">
              <p><strong>Pedido:</strong> #{dispute.orderId}</p>
              <p><strong>Anunciante:</strong> {dispute.advertiser}</p>
              <p><strong>Criador:</strong> {dispute.creator}</p>
              <p className="text-gray-600 leading-relaxed"><strong>Resumo:</strong> {dispute.summary}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Evidência do Anunciante</CardTitle>
                <CardDescription>Documentos e provas submetidos</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <p>{dispute.evidenceAdvertiser}</p>
                <Button variant="outline" size="sm">Ver anexos</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Evidência do Criador</CardTitle>
                <CardDescription>Documentos e provas submetidos</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <p>{dispute.evidenceCreator}</p>
                <Button variant="outline" size="sm">Ver anexos</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ações de Resolução</CardTitle>
              <CardDescription>Selecione o desfecho apropriado para a disputa</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Favorecer Anunciante
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Favorecer Criador
              </Button>
              <Button variant="destructive" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Solicitar mais provas
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </RequireRole>
  );
}


