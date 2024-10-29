'use client';
import * as z from 'zod';
import axios from 'axios';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const FormSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  photo: z.instanceof(File),
});

export default function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      photo: new File([], ''),
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await axios.post('http://localhost:8080/user', data, { headers: { 'Content-Type': 'multipart/form-data' }})
      .then(function (response) {
        localStorage.setItem('message', response.data.message);
        router.push('/login');
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
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-4')}>
        <h1 className={cn('text-2xl font-semibold')}>Register</h1>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='text' placeholder='Username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='email' placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='photo'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='file' onChange={e => field.onChange(e.target.files ? e.target.files[0] : null)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' variant='violet'>Submit</Button>
        <Link href='/login' className={cn('text-xs lg:text-sm font-light hover:underline')}>already have an account?</Link>
      </form>
    </Form>
  );
};
