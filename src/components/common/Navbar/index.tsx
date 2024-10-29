import Link from 'next/link';
import Image from 'next/image';
import MainNav from './MainNav';
import { cn } from '@/lib/utils';
// Image
import logo from '../../../../public/assets/palm-logo-transparent.png';

export default function Navbar() {
  return (
    <div className={cn('flex h-16 bg-gradient-to-r from-slate-200 via-white to-slate-200')}>
      <div className={cn('layout flex justify-between items-center w-full h-full')}>
        <Link href='/'><Image src={logo} alt='Palm' className={cn('h-10 w-auto')} /></Link>
        <MainNav />
      </div>
    </div>
  );
};
