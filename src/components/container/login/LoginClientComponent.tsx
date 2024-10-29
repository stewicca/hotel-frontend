'use client';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export default function LoginClientComponent({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  useEffect(() => {
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
