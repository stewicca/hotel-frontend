import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function OurRooms({ data }: { data: any }) {
  return (
    <div className={cn('layout flex flex-col gap-6 mt-12')}>
      <div className={cn('space-y-2')}>
        <h2 className={cn('text-2xl font-semibold')}>Our rooms</h2>
        <p className={cn('text-muted-foreground')}>It's time to reward yourself by relaxing at our resort</p>
      </div>
      <div className={cn('flex justify-center xl:justify-normal flex-wrap gap-4')}>
        {data ? data.map((data: any, index: number) => (
          <Card className={cn('max-w-xs xl:max-w-[14rem] w-full bg-primary-foreground rounded-lg shadow-md')} key={index}>
            <CardHeader className='pt-0 px-0'>
              <Image src={data.image} alt='Room Image' width='500' height='500' className={cn('w-auto h-40 rounded-t-lg')} />
            </CardHeader>
            <CardContent>
              <CardTitle>{data.name}</CardTitle>
              <CardDescription>{data.desc}</CardDescription>
            </CardContent>
            <CardFooter>
              <p className={cn('text-red-400 font-semibold')}>IDR {data.price}</p>
            </CardFooter>
          </Card>
        )) : ''}
      </div>
    </div>
  );
};
