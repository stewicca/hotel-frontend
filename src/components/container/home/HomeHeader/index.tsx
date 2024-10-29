import { cn } from '@/lib/utils';
import HomeSearchRoomForm from './HomeSearchRoomForm';

export default function HomeHeader() {
  return (
    <header className={cn('relative h-xl lg:h-2xl bg-[url("/assets/home-header-background.jpg")] bg-cover bg-center')}>
      <div className={cn('lg:layout relative flex flex-col justify-center items-center h-full')}>
        <h1 className={cn('hidden lg:block lg:absolute bottom-20 left-0 text-white text-5xl font-semibold')}>Have a good experience with us</h1>
        <HomeSearchRoomForm />
      </div>
    </header>
  );
};
