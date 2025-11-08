'use client';

import { ReactNode, useEffect } from 'react';

type Role = 'creator' | 'advertiser' | 'admin';

interface RequireRoleProps {
  role?: Role;
  allowedRoles?: Role[];
  children: ReactNode;
}

export default function RequireRole({ role, allowedRoles, children }: RequireRoleProps) {
  useEffect(() => {
    const raw = localStorage.getItem('kula_user');
    const user = raw ? JSON.parse(raw) : null;

    if (!user) {
      window.location.href = '/login';
      return;
    }

    const allowed = allowedRoles ?? (role ? [role] : []);

    if (allowed.length > 0 && !allowed.includes(user.role)) {
      const fallback: Record<Role, string> = {
        creator: '/dashboard/creator',
        advertiser: '/dashboard/advertiser',
        admin: '/dashboard/admin',
      };
      window.location.href = fallback[user.role as Role] ?? '/';
    }
  }, [role, allowedRoles]);

  return <>{children}</>;
}


