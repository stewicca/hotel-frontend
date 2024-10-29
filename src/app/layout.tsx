import './globals.css';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import UserProvider from './user-provider';
import TokenProvider from './token-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Palm Resort',
  description: 'Hotel Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'flex flex-col justify-between min-h-screen')}>
        <TokenProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </TokenProvider>
        <Toaster />
      </body>
    </html>
  );
};
