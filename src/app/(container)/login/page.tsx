import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import LoginForm from '@/components/container/login/LoginForm';
import LoginClientComponent from '@/components/container/login/LoginClientComponent';
// Image
import logo from '../../../../public/assets/palm-logo-transparent.png';

export default function Login() {
  return (
    <LoginClientComponent>
      <div className={cn('flex flex-col lg:flex-row justify-center lg:justify-normal items-center gap-6 lg:gap-0 w-full min-h-screen bg-primary-foreground')}>
        <div className={cn('flex justify-center items-center h-1/2 lg:min-h-screen lg:w-1/2 bg-primary-foreground')}>
          <Link href='/'><Image src={logo} alt='Logo' className={cn('w-36 lg:w-56')} /></Link>
        </div>
        <div className={cn('flex justify-center items-center h-1/2 lg:min-h-screen lg:w-1/2 p-8 lg:p-0 bg-white rounded-lg lg:rounded-s-full shadow-2xl')}>
          <LoginForm />
        </div>
      </div>
    </LoginClientComponent>
  );
};
