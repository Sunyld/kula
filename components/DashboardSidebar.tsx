'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  MessageSquare, 
  Wallet, 
  Heart, 
  Star, 
  ShieldCheck, 
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  AlertCircle,
  Search
} from 'lucide-react';
import { useState, useEffect, memo } from 'react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  roles?: ('admin' | 'advertiser' | 'creator')[];
}

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

/**
 * MENUS BASEADOS NA DOCUMENTAÇÃO FUNCIONAL:
 * 
 * ANUNCIANTE (Fluxo C):
 * - Dashboard (Visão Geral)
 * - Explorar Canais (Marketplace) - PRINCIPAL
 * - Favoritos
 * - Meus Pedidos/Campanhas
 * - Carteira (adicionar fundos)
 * - Avaliações
 * - Abrir Disputa
 * 
 * CRIADOR (Fluxo B):
 * - Dashboard (Visão Geral)
 * - Meus Canais (gerir canais)
 * - Meus Pedidos (gerir pedidos)
 * - Carteira (levantar fundos)
 * - Avaliações
 * - Abrir Disputa
 * NOTA: Criadores NÃO têm acesso ao Marketplace (eles vendem, não compram)
 * 
 * ADMIN:
 * - Dashboard (Visão Geral)
 * - Utilizadores
 * - Canais (aprovar/rejeitar)
 * - Disputas
 * - Avaliações (moderação)
 * - Definições do Sistema
 */

// Menu do ANUNCIANTE (ordem baseada na importância do fluxo)
const advertiserItems: SidebarItem[] = [
  { href: '/dashboard/advertiser', label: 'Visão Geral', Icon: LayoutDashboard },
  { href: '/marketplace', label: 'Explorar Canais', Icon: Search }, // Marketplace é o principal para anunciantes
  { href: '/favorites', label: 'Favoritos', Icon: Heart },
  { href: '/orders/advertiser', label: 'Meus Pedidos', Icon: ShoppingBag },
  { href: '/wallet', label: 'Carteira', Icon: Wallet },
  { href: '/reviews', label: 'Avaliações', Icon: Star },
  { href: '/disputes/new', label: 'Abrir Disputa', Icon: ShieldCheck },
];

// Menu do CRIADOR (ordem baseada na importância do fluxo)
const creatorItems: SidebarItem[] = [
  { href: '/dashboard/creator', label: 'Visão Geral', Icon: LayoutDashboard },
  { href: '/channels', label: 'Meus Canais', Icon: MessageSquare }, // Principal para criadores
  { href: '/orders/creator', label: 'Meus Pedidos', Icon: ShoppingBag },
  { href: '/wallet', label: 'Carteira', Icon: Wallet },
  { href: '/reviews', label: 'Avaliações', Icon: Star },
  { href: '/disputes/new', label: 'Abrir Disputa', Icon: ShieldCheck },
];

// Menu do ADMIN
const adminItems: SidebarItem[] = [
  { href: '/dashboard/admin', label: 'Visão Geral', Icon: LayoutDashboard },
  { href: '/admin/users', label: 'Utilizadores', Icon: Users },
  { href: '/admin/channels', label: 'Canais', Icon: MessageSquare },
  { href: '/admin/disputes', label: 'Disputas', Icon: AlertCircle },
  { href: '/admin/reviews', label: 'Avaliações', Icon: Star },
  { href: '/admin/settings', label: 'Definições', Icon: Settings },
];

function DashboardSidebarInner({ isOpen, onToggle, onLogout }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<'admin' | 'advertiser' | 'creator' | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('kula_user') || '{}');
      setUserRole(user.role || 'advertiser');
    }
  }, []);

  // Determinar quais itens mostrar baseado no role
  let items: SidebarItem[] = [];
  if (userRole === 'admin') {
    items = adminItems;
  } else if (userRole === 'advertiser') {
    items = advertiserItems;
  } else if (userRole === 'creator') {
    items = creatorItems;
  }

  const isActive = (href: string) => {
    // Para dashboards, match exato
    if (href === '/dashboard/admin' || href === '/dashboard/advertiser' || href === '/dashboard/creator') {
      return pathname === href;
    }
    // Para outras rotas, match por prefixo
    return pathname?.startsWith(href);
  };

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <Link href="/" className="text-xl font-bold text-[var(--kula-secondary)] hover:opacity-80 transition-opacity">
          {isOpen ? 'Kula' : 'K'}
        </Link>
        <div className="flex items-center gap-2">
          {/* Desktop toggle button (hamburger) */}
          <button
            onClick={onToggle}
            className="hidden md:flex p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            aria-label={isOpen ? 'Recolher menu' : 'Expandir menu'}
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1 rounded-md hover:bg-gray-100"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <nav className="px-2 py-4 space-y-1 overflow-y-auto flex-1">
        {items.map((item) => {
          const active = isActive(item.href);
          const Icon = item.Icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-gradient-to-r from-[var(--kula-primary)] to-[var(--kula-secondary)] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                !isOpen && 'justify-center'
              )}
              title={!isOpen ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      {/* Logout button at the bottom */}
      <div className="px-2 py-4 border-t">
        <button
          onClick={() => {
            setIsMobileOpen(false);
            onLogout();
          }}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-red-600 hover:bg-red-50',
            !isOpen && 'justify-center'
          )}
          title={!isOpen ? 'Sair' : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {isOpen && <span>Sair</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white border shadow-sm"
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileOpen(false)}>
          <aside
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden md:flex md:flex-col md:fixed md:inset-y-0 md:border-r md:bg-white md:shadow-sm transition-all duration-300 z-20',
        isOpen ? 'md:w-64' : 'md:w-16'
      )}>
        <SidebarContent />
      </aside>
    </>
  );
}

const DashboardSidebar = memo(DashboardSidebarInner);
export default DashboardSidebar;
