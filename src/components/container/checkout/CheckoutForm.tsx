'use client';
import * as z from 'zod';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useUserContext } from '@/app/user-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTokenContext } from '@/app/token-provider';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const FormSchema = z.object({
  bookerName: z.string(),
  bookerEmail: z.string(),
  checkInDate: z.date(),
  checkOutDate: z.date(),
  guestName: z.string(),
  totalRooms: z.number(),
  roomTypeId: z.string(),
  userId: z.string(),
});

export default function CheckoutForm({ searchParams }: { searchParams: { [key: string]: string | undefined }}) {
  const { token } = useTokenContext();
  const { user } = useUserContext();
  const { toast } = useToast();
  const router = useRouter();

  const fromDate = searchParams.from ? new Date(searchParams.from) : undefined;
  const toDate = searchParams.to ? new Date(searchParams.to) : undefined;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bookerName: user?.username,
      bookerEmail: user?.email,
      checkInDate: fromDate,
      checkOutDate: toDate,
      guestName: '',
      totalRooms: 0,
      roomTypeId: searchParams.id,
      userId: user?.id
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await axios.post('http://localhost:8080/booking', data, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }})
    .then(function (response) {
      localStorage.setItem('message', response.data.message);
      router.push('/yourorders');
    })
    .catch(function (error) {
      toast({
        description: error.response.data.message,
        variant: 'violet',
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('lg:w-3/5 p-8 mt-10 space-y-6 bg-primary-foreground rounded-xl border')}>
        <h1 className={cn('text-2xl font-semibold')}>Booking Form</h1>
        <FormField
          control={form.control}
          name='bookerName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bookerEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='guestName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guest Name</FormLabel>
              <FormControl>
                <Input placeholder='Guest Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='totalRooms'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Rooms</FormLabel>
              <FormControl>
                <Input placeholder='Total Rooms' onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' variant='violet'>Checkout</Button>
      </form>
    </Form>
  );
};
