'use client';
import * as z from 'zod';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTokenContext } from '@/app/token-provider';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RoomType {
  id: string
  name: string
  price: string
  desc: string
  image: string
};

const FormSchema = z.object({
  number: z.coerce.number(),
  roomTypeId: z.string(),
});

export default function AddRoomForm() {
  const [ roomType, setRoomType ] = useState<RoomType[] | undefined>();
  const { token } = useTokenContext();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      roomTypeId: '',
    },
  });

  async function getRoomTypes() {
    await axios.get('http://localhost:8080/roomtype', { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }})
    .then(function (response) {
      setRoomType(response.data.data);
    })
    .catch(function (error) {
      toast({
        description: error.response.data.message,
        variant: 'default',
      });
    });
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await axios.post('http://localhost:8080/room', data, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }})
      .then(function (response) {
        localStorage.setItem('message', response.data.message);
        router.push('/dashboard/room');
      })
      .catch(function (error) {
        toast({
          description: error.response.data.message,
          variant: 'default',
        });
      });
  };

  useEffect(() => {
    if (token) getRoomTypes();
  }, [token]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-4')}>
        <h1 className={cn('text-2xl font-semibold')}>Add Room</h1>
        <FormField
          control={form.control}
          name='number'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='number' placeholder='Number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='roomTypeId'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={value => field.onChange(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder='Type' />
                  </SelectTrigger>
                  <SelectContent>
                    { roomType ? roomType.map((data) => <SelectItem value={data.id}>{data.name}</SelectItem>) : '' }
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
