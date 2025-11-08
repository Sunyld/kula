import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { formatMzn } from '@/lib/format';
import TransactionsTable, { Transaction } from '@/components/TransactionsTable';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDownCircle, ArrowUpCircle, Wallet, ShieldCheck, CreditCard } from 'lucide-react';

const transactions: Transaction[] = [
  { id: 1, date: '2024-01-18', description: 'Pagamento Pedido #302', type: 'credit', method: 'Wallet', amount: 350 },
  { id: 2, date: '2024-01-16', description: 'Depósito M-Pesa', type: 'credit', method: 'M-Pesa', amount: 500 },
  { id: 3, date: '2024-01-14', description: 'Liberação Escrow #298', type: 'credit', method: 'Wallet', amount: 240 },
  { id: 4, date: '2024-01-13', description: 'Compra de Campanha #301', type: 'debit', method: 'Visa', amount: 180 },
  { id: 5, date: '2024-01-10', description: 'Depósito e-Mola', type: 'credit', method: 'e-Mola', amount: 800 },
  { id: 6, date: '2024-01-08', description: 'Pagamento Pedido #295', type: 'credit', method: 'Wallet', amount: 220 },
  { id: 7, date: '2024-01-05', description: 'Compra de Campanha #297', type: 'debit', method: 'M-Pesa', amount: 120 },
  { id: 8, date: '2024-01-02', description: 'Depósito M-Pesa', type: 'credit', method: 'M-Pesa', amount: 400 },
  { id: 9, date: '2023-12-28', description: 'Liberação Escrow #286', type: 'credit', method: 'Wallet', amount: 150 },
  { id: 10, date: '2023-12-25', description: 'Compra de Campanha #280', type: 'debit', method: 'Visa', amount: 210 },
];

export default function WalletPage() {
  const balances = {
    creator: {
      available: 1250,
      pending: 320,
    },
    advertiser: {
      available: 820,
      pending: 540,
    },
  };

  return (
    <RequireRole allowedRoles={['creator', 'advertiser']}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Minha Carteira</h1>
            <p className="text-gray-600 mt-1">Gestão de saldos, transações e métodos de pagamento</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Saldo Criador</CardTitle>
                  <CardDescription>Recebimentos das suas campanhas</CardDescription>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Wallet className="h-4 w-4" />
                  Criador
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Saldo Disponível</p>
                    <p className="text-2xl font-semibold">{formatMzn(balances.creator.available)}</p>
                  </div>
                  <ArrowDownCircle className="h-10 w-10 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pendências (Escrow)</p>
                    <p className="text-lg font-medium text-gray-800">{formatMzn(balances.creator.pending)}</p>
                  </div>
                  <ShieldCheck className="h-6 w-6 text-amber-500" />
                </div>
                <div className="pt-2 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Levantar via M-Pesa</Button>
                  <Button variant="outline" size="sm">Levantar via e-Mola</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Saldo Anunciante</CardTitle>
                  <CardDescription>Saldo disponível para campanhas</CardDescription>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4" />
                  Anunciante
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Saldo Disponível</p>
                    <p className="text-2xl font-semibold">{formatMzn(balances.advertiser.available)}</p>
                  </div>
                  <ArrowUpCircle className="h-10 w-10 text-rose-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pendências (Escrow)</p>
                    <p className="text-lg font-medium text-gray-800">{formatMzn(balances.advertiser.pending)}</p>
                  </div>
                  <ShieldCheck className="h-6 w-6 text-amber-500" />
                </div>
                <div className="pt-2 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Depositar com M-Pesa</Button>
                  <Button variant="outline" size="sm">Depositar com e-Mola</Button>
                  <Button variant="outline" size="sm">Depositar com Visa</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Transações</CardTitle>
              <CardDescription>Registo completo de entradas e saídas</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionsTable transactions={transactions} />
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </RequireRole>
  );
}


