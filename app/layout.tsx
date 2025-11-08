import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kula — Minha audiência, sua audiência',
  description:
    'Kula conecta Donos de Canais e Anunciantes. Descubra, confie e colabore com segurança.',
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  themeColor: '#f68b7b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
