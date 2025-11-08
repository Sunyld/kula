'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'creator' | 'advertiser'>('advertiser');

  return (
    <main>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center px-6 md:px-20 mt-16">
        <div className="w-full max-w-lg bg-white border rounded-2xl shadow-sm p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center">Criar conta</h1>
          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); const user = { name, email, phone, role, password }; localStorage.setItem('kula_user', JSON.stringify(user)); router.push(role === 'creator' ? '/dashboard/creator' : '/dashboard/advertiser'); }}>
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="voce@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" type="tel" placeholder="(+258) 84 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="role">Perfil</Label>
              <select id="role" className="w-full border rounded-md h-10 px-3" value={role} onChange={(e) => setRole(e.target.value as any)}>
                <option value="advertiser">Anunciante</option>
                <option value="creator">Criador</option>
              </select>
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="btn-gradient w-full h-11">Registar</Button>
          </form>
        </div>
      </section>
    </main>
  );
}



