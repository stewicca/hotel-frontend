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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FormSchema = z.object({
  username: z.string(),
  email: z.string(),
  photo: z.instanceof(File),
  role: z.string(),
});

export default function EditUserForm({ user }: { user: any }) {
  const { token } = useTokenContext();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: user.username ?? '',
      email:  user.email ?? '',
      photo: new File([], ''),
      role: user.role ?? '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await axios.put(`http://localhost:8080/user/${user.id}`, data, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }})
      .then(function (response) {
        localStorage.setItem('message', response.data.message);
        router.push('/dashboard/user');
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
        <h1 className={cn('text-2xl font-semibold')}>Edit User</h1>
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
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={value => field.onChange(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder='Role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='user'>User</SelectItem>
                    <SelectItem value='admin'>Admin</SelectItem>
                    <SelectItem value='receptionist'>Receptionist</SelectItem>
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
