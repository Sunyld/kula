"use client";

import DashboardLayout from '@/components/DashboardLayout';
import RequireRole from '@/components/RequireRole';
import { useEffect, useState } from 'react';

interface AvailabilityClientProps {
  params: { id: string };
}

export default function AvailabilityClient({ params }: AvailabilityClientProps) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const key = `kula_availability_${params.id}`;
  const [blocked, setBlocked] = useState<number[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(key);
    setBlocked(raw ? JSON.parse(raw) : []);
  }, [key]);

  const toggle = (day: number) => {
    setBlocked((prev) => {
      const isBlocked = prev.includes(day);
      const next = isBlocked ? prev.filter((d) => d !== day) : [...prev, day];
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };

  return (
    <RequireRole allowedRoles={['creator']}>
      <DashboardLayout>
        <section className="max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold">Disponibilidade — Canal #{params.id}</h1>
          <p className="text-gray-600 mt-2">Marque dias indisponíveis (exemplo MVP).</p>
          <div className="mt-6 grid grid-cols-7 gap-2">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => toggle(d)}
                className={`h-12 rounded-md border ${blocked.includes(d) ? 'bg-rose-50 border-rose-200' : 'bg-white hover:bg-gray-50'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </section>
      </DashboardLayout>
    </RequireRole>
  );
}



