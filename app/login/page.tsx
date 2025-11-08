'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUsers = [
      { email: 'creator@kula.dev', password: '123456', role: 'creator' },
      { email: 'advertiser@kula.dev', password: '123456', role: 'advertiser' },
      { email: 'admin@kula.dev', password: '123456', role: 'admin' },
    ];
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (!user) {
      setError('Credenciais inválidas');
      return;
    }
    localStorage.setItem('kula_user', JSON.stringify(user));
    router.push(user.role === 'creator' ? '/dashboard/creator' : '/dashboard/advertiser');
  };
  return (
    <main>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center px-6 md:px-20 mt-16">
        <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center">Entrar</h1>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="creator@kula.dev • advertiser@kula.dev • admin@kula.dev" />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="123456" />
            </div>
            <Button type="submit" className="btn-gradient w-full h-11">Entrar</Button>
          </form>
          {error && <p className="text-sm text-red-600 mt-3 text-center">{error}</p>}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Não tem conta?{' '}
            <Link href="/register" className="text-[--kula-secondary] underline">Registar</Link>
          </p>
        </div>
      </section>
    </main>
  );
}


