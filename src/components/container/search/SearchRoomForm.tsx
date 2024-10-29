'use client';
import qs from 'qs';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const FormSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export default function SearchRoomForm({ searchParams }: { searchParams: { [key: string]: string | undefined }}) {
  const router = useRouter();

  const fromDate = searchParams.from ? new Date(searchParams.from) : undefined;
  const toDate = searchParams.to ? new Date(searchParams.to) : undefined;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: {
        from: fromDate,
        to: toDate,
      },
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const query = {
      from: data.date.from,
      to: data.date.to,
    };

    const stringifyQuery = qs.stringify(query, { addQueryPrefix: true });

    router.push(`http://localhost:3000/search${stringifyQuery}`);
  };

  return (
    <div className={cn('lg:layout flex justify-center items-center w-full h-64 md:h-40 bg-salem rounded-b-3xl')}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col md:flex-row gap-2')}>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className={cn('flex flex-col')}>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'} size='xl' className={cn("lg:w-[500px] flex justify-start md:text-md", !field.value && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value?.to ? (
                            <>
                            {format(field.value.from, "LLL dd, y")} - {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <Button type='submit' variant='violet' size='xl'>Let's Search</Button>
        </form>
      </Form>
    </div>
  );
};
