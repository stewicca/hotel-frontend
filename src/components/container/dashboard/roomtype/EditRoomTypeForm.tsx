'use client';
import * as z from 'zod';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTokenContext } from '@/app/token-provider';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const FormSchema = z.object({
  name: z.string(),
  price: z.string(),
  desc: z.string(),
  image: z.instanceof(File),
});

export default function EditRoomTypeForm({ roomType }: { roomType: any }) {
  const { token } = useTokenContext();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: roomType.name ?? '',
      price: roomType.price ?? '',
      desc: roomType.desc ?? '',
      image: new File([], ''),
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await axios.put(`http://localhost:8080/roomtype/${roomType.id}`, data, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }})
      .then(function (response) {
        localStorage.setItem('message', response.data.message);
        router.push('/dashboard/roomtype');
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
        <h1 className={cn('text-2xl font-semibold')}>Add User</h1>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='text' placeholder='Type' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='text' placeholder='Price' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='desc'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='text' placeholder='Description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='file' onChange={e => field.onChange(e.target.files ? e.target.files[0] : null)} />
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
