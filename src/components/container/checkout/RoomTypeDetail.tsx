import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function RoomTypeDetail({ data, searchParams }: { data: any, searchParams: any }) {
  const fromDate = searchParams.from ? new Date(searchParams.from) : undefined;
  const toDate = searchParams.to ? new Date(searchParams.to) : undefined;
  return (
    <Card className={cn('lg:w-2/6 h-52 mt-10 bg-primary-foreground')}>
      <CardHeader>
        <div className={cn('flex items-center gap-4')}>
          <Image src={data.image} alt='Room Image' width='500' height='500' className={cn('w-10 h-10 rounded-xl')} />
          <p className={cn('font-semibold')}>{data.desc}</p>
        </div>
      </CardHeader>
      <CardContent>
        <hr className={cn('mb-3')} />
        { fromDate && toDate ? (
          <p className={cn('text-sm font-light')}>{format(fromDate, "LLL dd, y")} - {format(toDate, "LLL dd, y")}</p>
        ) : (
          <p className={cn('text-sm font-light')}>Date is not valid!</p>
        )}
        <hr className={cn('my-3')} />
        <p className={cn('text-red-400 font-semibold')}>IDR {data.price}</p>
      </CardContent>
    </Card>
  )
};
