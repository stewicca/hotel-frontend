'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { blockAccess } from '@/lib/blockAccess';

export default function CheckoutClientComponent({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    blockAccess(['user', 'admin', 'receptionist'], router, '/', null);
  }, []);

  return (
    <>
      {children}
    </>
  );
};
