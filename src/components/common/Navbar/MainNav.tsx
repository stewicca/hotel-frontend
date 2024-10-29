'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useUserContext } from '@/app/user-provider';
import { useTokenContext } from '@/app/token-provider';
import { Button, buttonVariants } from '../../ui/button';

export default function MainNav() {
  const { token, setToken } = useTokenContext();
  const { user } = useUserContext();
  const { toast } = useToast();
  const router = useRouter();

  function handleClick() {
    localStorage.removeItem('token');
    setToken('');
    toast({
      description: 'Logout successful.',
      variant: 'violet',
    });
    router.push('/');
  };

  return (
    <>
      { token === '' ? (
        <nav className={cn('flex items-center gap-4')}>
          <Link href='/login' className={cn('font-medium')}>Login</Link>
          <Link href='/register' className={cn(buttonVariants({ variant: 'violet', size: 'sm' }))}>Register</Link>
        </nav>
      ) : (
        <nav className={cn('flex items-center gap-4')}>
          { user && user.role !== 'user' ? (
            <Link href='/dashboard' className={cn('font-medium')}>Dashboard</Link>
          ) : (
            <Link href='/yourorders' className={cn('font-medium')}>Your Orders</Link>
          )}
          <Button variant='violet' size='sm' onClick={handleClick}>Logout</Button>
        </nav>
      )}
    </>
  );
};
