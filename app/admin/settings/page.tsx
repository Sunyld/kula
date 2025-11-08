'use client';

import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function AdminSettings() {
  return (
    <RequireRole allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="space-y-6 max-w-4xl">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Definições da Plataforma</h1>
            <p className="text-gray-600 mt-1">Configure preferências globais e integrações</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alertas e Notificações</CardTitle>
              <CardDescription>Controle envios automáticos para criadores e anunciantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-gray-900">Alertas de Disputa</p>
                  <p className="text-sm text-gray-500">Receber e-mails quando uma disputa for aberta</p>
                </div>
                <Switch defaultChecked aria-label="Alertas de disputa" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-gray-900">Alertas de Verificação</p>
                  <p className="text-sm text-gray-500">Notificar quando novos canais aguardarem revisão</p>
                </div>
                <Switch defaultChecked aria-label="Alertas de verificação" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrações de Pagamento</CardTitle>
              <CardDescription>Configure credenciais das operadoras</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mpesa-key">Token M-Pesa</Label>
                <Input id="mpesa-key" placeholder="Insira o token" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emola-key">Token e-Mola</Label>
                <Input id="emola-key" placeholder="Insira o token" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="visa-account">Identificador Visa</Label>
                <Input id="visa-account" placeholder="merchant_visa_123" />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button className="btn-gradient">Guardar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </RequireRole>
  );
}



