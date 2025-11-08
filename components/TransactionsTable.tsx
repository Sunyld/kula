'use client';

import { useMemo, useState } from 'react';
import { formatMzn } from '@/lib/format';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

export interface Transaction {
  id: number;
  date: string;
  description: string;
  type: 'credit' | 'debit';
  method: 'M-Pesa' | 'e-Mola' | 'Visa' | 'Wallet';
  amount: number;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  pageSize?: number;
}

export default function TransactionsTable({ transactions, pageSize = 8 }: TransactionsTableProps) {
  const [page, setPage] = useState(1);

  const { rows, totalPages } = useMemo(() => {
    const start = (page - 1) * pageSize;
    const sliced = transactions.slice(start, start + pageSize);
    return {
      rows: sliced,
      totalPages: Math.max(1, Math.ceil(transactions.length / pageSize)),
    };
  }, [transactions, page, pageSize]);

  const previous = () => setPage((current) => Math.max(1, current - 1));
  const next = () => setPage((current) => Math.min(totalPages, current + 1));

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Data</th>
              <th className="px-4 py-3 text-left">Descrição</th>
              <th className="px-4 py-3 text-left">Método</th>
              <th className="px-4 py-3 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((transaction) => (
              <tr key={transaction.id} className="border-t">
                <td className="px-4 py-3 text-gray-600">{new Date(transaction.date).toLocaleDateString('pt-MZ')}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-xs text-gray-500">ID #{transaction.id}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{transaction.method}</td>
                <td className="px-4 py-3 text-right font-semibold flex items-center justify-end gap-2">
                  {transaction.type === 'credit' ? (
                    <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowDownCircle className="h-4 w-4 text-rose-500" />
                  )}
                  <span className={transaction.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'}>
                    {formatMzn(transaction.amount)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end gap-3 text-sm text-gray-600">
        <button
          onClick={previous}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-md border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={next}
          disabled={page === totalPages}
          className="px-3 py-1.5 rounded-md border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}


