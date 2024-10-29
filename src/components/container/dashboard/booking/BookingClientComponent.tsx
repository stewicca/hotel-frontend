'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { blockAccess } from '@/lib/blockAccess';
import { useToast } from '@/components/ui/use-toast';

export default function BookingClientComponent({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    blockAccess(['receptionist'], router, '/', 'Access Forbidden!');

    if (localStorage.getItem('message')) {
      const message = localStorage.getItem('message');

      toast({
        description: message,
        variant: 'default',
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
