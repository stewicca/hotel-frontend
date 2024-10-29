import qs from 'qs';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function AvailableRoom({ data, searchParams }: { data: any, searchParams: any }) {
  return (
    <div className={cn('layout flex flex-col justify-center items-center gap-6 mt-12')}>
      {data ? data.map((data: any, index: number) => {
        const query = {
          id: data.id,
          from: searchParams.from,
          to: searchParams.to,
        };
        
        const stringifyQuery = qs.stringify(query, { addQueryPrefix: true });
        return (
          <Card className={cn('flex flex-col md:flex-row max-w-xs md:max-w-xl w-full bg-primary-foreground rounded-lg shadow-md')} key={index}>
            <Image src={data.image} alt='Room Image' width='500' height='500' className={cn('w-auto md:w-64 h-52 rounded-t-lg md:rounded-l-lg md:rounded-tr-none')} />
            <div className={cn('w-full')}>
              <CardHeader>
                <CardTitle>{data.name}</CardTitle>
                <p className={cn('text-red-400 text-xs')}>{data.rooms.length} rooms left!</p>
              </CardHeader>
              <CardContent>
                <CardDescription>{data.desc}</CardDescription>
              </CardContent>
              <CardFooter className={cn('flex justify-between items-center')}>
                <p className={cn('text-red-400 font-semibold')}>IDR {data.price}</p>
                <Link href={`http://localhost:3000/checkout${stringifyQuery}`}><Button variant='violet'>Book Now!</Button></Link>
              </CardFooter>
            </div>
          </Card>
        )
      }) : ''}
    </div>
  );
};
