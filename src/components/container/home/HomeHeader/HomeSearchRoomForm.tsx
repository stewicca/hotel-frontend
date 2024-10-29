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

export default function HomeSearchRoomForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
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
    <div className={cn('absolute lg:relative bottom-0 w-full lg:w-fit pt-10 lg:pt-0 bg-background rounded-t-3xl lg:rounded-md')}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-0')}>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className={cn('flex flex-col')}>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'} size='xl' className={cn("w-[300px] md:w-[500px] lg:w-[400px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
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
          <Button type='submit' variant='violet' size='xl' className={cn('w-[300px] md:w-[500px] lg:w-fit')}>Let's Search</Button>
        </form>
      </Form>
    </div>
  );
};
