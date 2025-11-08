'use client';

import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function NewChannel() {
  const [previews, setPreviews] = useState<string[]>([]);
  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };
  return (
    <main>
      <Navbar />
      <section className="min-h-screen px-6 md:px-20 mt-16 py-10 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold">Adicionar Canal</h1>
        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="platform">Plataforma</Label>
            <select id="platform" className="w-full border rounded-md h-10 px-3">
              <option>WhatsApp</option>
              <option>TikTok</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>Telegram</option>
              <option>YouTube</option>
            </select>
          </div>
          <div>
            <Label htmlFor="name">Nome do Canal</Label>
            <Input id="name" placeholder="Ex: MozHumor" />
          </div>
          <div>
            <Label htmlFor="link">Link do Canal</Label>
            <Input id="link" placeholder="URL" />
          </div>
          <div>
            <Label htmlFor="followers">Seguidores</Label>
            <Input id="followers" type="number" placeholder="15000" />
          </div>
          <div>
            <Label htmlFor="price">Preço base</Label>
            <Input id="price" type="number" placeholder="100" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="niche">Nicho</Label>
            <Input id="niche" placeholder="Humor, Notícias, Educação... (separe por vírgula)" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="location">Localização do Público</Label>
            <Input id="location" placeholder="Maputo, Luanda, Moçambique... (separe por vírgula)" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">Descrição</Label>
            <textarea id="description" className="w-full border rounded-md px-3 py-2 h-28" placeholder="Explique porque seu canal é ideal para anunciantes" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="portfolio">Portfólio (screenshots)</Label>
            <input id="portfolio" type="file" multiple className="w-full border rounded-md px-3 py-2 bg-white" onChange={onFiles} />
            {previews.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {previews.map((src, i) => (
                  <img key={i} src={src} className="h-24 w-full object-cover rounded-md border" />
                ))}
              </div>
            )}
          </div>
          <div className="md:col-span-2 mt-2">
            <Button className="btn-gradient">Guardar</Button>
          </div>
        </form>
      </section>
    </main>
  );
}




