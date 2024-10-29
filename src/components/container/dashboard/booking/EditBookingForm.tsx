'use client';
import * as z from 'zod';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useParams } from 'next/navigation';
import { useTokenContext } from '@/app/token-provider';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FormSchema = z.object({
  bookingStatus: z.string(),
});

export default function EditBookingForm() {
  const params = useParams<{ id: string }>();
  const { token } = useTokenContext();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bookingStatus: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await axios.put(`http://localhost:8080/booking/${params.id}`, data, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }})
      .then(function (response) {
        localStorage.setItem('message', response.data.message);
        router.push('/dashboard/booking');
      })
      .catch(function (error) {
        toast({
          description: error.response.data.message,
          variant: 'default',
        });
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-4')}>
        <h1 className={cn('text-2xl font-semibold')}>Booking Status</h1>
        <FormField
          control={form.control}
          name='bookingStatus'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={value => field.onChange(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder='Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='checkIn'>Check In</SelectItem>
                    <SelectItem value='checkOut'>Check Out</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
