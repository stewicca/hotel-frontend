'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { blockAccess } from '@/lib/blockAccess';
import { useToast } from '@/components/ui/use-toast';

export default function YourOrdersClientComponent({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    blockAccess(['user', 'admin', 'receptionist'], router, '/', null);

    if (localStorage.getItem('message')) {
      const message = localStorage.getItem('message');

      toast({
        description: message,
        variant: 'violet',
      });

      localStorage.removeItem('message');
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
};
