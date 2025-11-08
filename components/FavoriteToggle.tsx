'use client';

import { Heart } from 'lucide-react';

export default function FavoriteToggle({ id }: { id: number }) {
  const [fav, setFav] = (require('react') as any).useState(false);
  (require('react') as any).useEffect(() => {
    const raw = localStorage.getItem('kula_favorites');
    const arr = raw ? JSON.parse(raw) as number[] : [];
    setFav(arr.includes(id));
  }, [id]);
  const toggle = () => {
    const raw = localStorage.getItem('kula_favorites');
    const arr = raw ? JSON.parse(raw) as number[] : [];
    const next = arr.includes(id) ? arr.filter(x=>x!==id) : [...arr, id];
    localStorage.setItem('kula_favorites', JSON.stringify(next));
    setFav(next.includes(id));
  };
  return (
    <button onClick={toggle} className={`w-full mt-3 flex items-center justify-center gap-2 border rounded-md px-3 py-2 ${fav ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white hover:bg-gray-50'}`}>
      <Heart className={`h-4 w-4 ${fav ? 'fill-rose-500' : ''}`} /> {fav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
    </button>
  );
}


