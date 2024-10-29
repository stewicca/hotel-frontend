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

interface RoomType {
  id: string
  name: string
  price: string
  desc: string
  image: string
};

export default function RoomTypeList() {
  const [ roomType, setRoomType ] = useState<RoomType[] | undefined>();
  const { token } = useTokenContext();
  const { toast } = useToast();

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

  async function deleteRoomType(id: string) {
    await axios.delete(`http://localhost:8080/roomtype/${id}`, { headers: { 'Authorization': `Bearer ${token}` }})
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
    if (token) getRoomTypes();
  }, [token, deleteRoomType]);

  return (
    <Table>
      <TableCaption>A list of your room type.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roomType ? roomType.map((data) => {
        const query = {
          id: data.id,
          name: data.name,
          price: data.price,
          desc: data.desc,
        };
        
        const stringifyQuery = qs.stringify(query, { addQueryPrefix: true });
        return (
          <TableRow key={data.id}>
            <TableCell>
              <Image src={data.image} alt={data.name} width={100} height={100} className='w-auto h-auto' />
            </TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.price}</TableCell>
            <TableCell>{data.desc}</TableCell>
            <TableCell className={cn('space-y-2 lg:space-y-0 lg:space-x-2')}>
              <Link href={`/dashboard/roomtype/edit${stringifyQuery}`}><Button size='sm'>Edit</Button></Link>
              <Button variant='destructive' size='sm' onClick={() => deleteRoomType(data.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        )}): ''}
      </TableBody>
    </Table>
  );
};