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
import { useTokenContext } from '@/app/token-provider';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const FormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function LoginForm() {
  const { setToken } = useTokenContext();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await axios.post('http://localhost:8080/auth', data, { headers: { 'Content-Type': 'application/json' }})
      .then(function (response) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('message', response.data.message);
        router.push('/');
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
        <h1 className={cn('text-2xl font-semibold')}>Log in</h1>
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
        <Button type='submit' variant='violet'>Submit</Button>
        <Link href='/register' className={cn('text-xs lg:text-sm font-light hover:underline')}>don't have account?</Link>
      </form>
    </Form>
  );
};
