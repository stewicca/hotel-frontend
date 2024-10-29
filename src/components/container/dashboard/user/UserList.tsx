'use client'
import qs from 'qs';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTokenContext } from '@/app/token-provider';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface User {
  id: string
  username: string
  photo: string
  email: string
  password: string
  role: string
};

export default function UserList() {
  const [ user, setUser ] = useState<User[] | undefined>();
  const { token } = useTokenContext();
  const { toast } = useToast();

  async function getUsers() {
    await axios.get('http://localhost:8080/user', { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }})
    .then(function (response) {
      setUser(response.data.data);
    })
    .catch(function (error) {
      toast({
        description: error.response.data.message,
        variant: 'default',
      });
    });
  };

  async function deleteUser(id: string) {
    await axios.delete(`http://localhost:8080/user/${id}`, { headers: { 'Authorization': `Bearer ${token}` }})
      .then(function (response) {
        localStorage.setItem('message', response.data.message);
      })
      .catch(function (error) {
        toast({
          description: error.response.data.message,
          variant: 'default',
        });
      });
  };

  useEffect(() => {
    if (token) getUsers();
  }, [token, deleteUser]);

  return (
    <Table>
      <TableCaption>A list of your users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Photo</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {user ? user.map((data) => {
        const query = {
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role,
        };
        
        const stringifyQuery = qs.stringify(query, { addQueryPrefix: true });
        return (
          <TableRow key={data.id}>
            <TableCell>
              <Image src={data.photo} alt={data.username} width={70} height={70} className='w-auto h-auto' />
            </TableCell>
            <TableCell>{data.username}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.role}</TableCell>
            <TableCell className={cn('space-y-2 lg:space-y-0 lg:space-x-2')}>
              { data.role === 'user' ? '' : (
                <>
                  <Link href={`/dashboard/user/edit${stringifyQuery}`}><Button size='sm'>Edit</Button></Link>
                  <Button variant='destructive' size='sm' onClick={() => deleteUser(data.id)} >Delete</Button>
                </>
              )}
            </TableCell>
          </TableRow>
        )}): ''}
      </TableBody>
    </Table>
  );
};