'use client';

import dynamic from 'next/dynamic';

const RotatingIcons = dynamic(() => import('@/components/RotatingIcons'), { 
  ssr: false 
});

export default function RotatingIconsWrapper() {
  return <RotatingIcons />;
}




