'use client'
import qs from 'qs';
import axios from 'axios';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTokenContext } from '@/app/token-provider';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Room {
  id: string
  number: number
  roomTypeId: string
  roomType: {
    name: string
  }
};

export default function RoomList() {
  const [ room, setRoom ] = useState<Room[] | undefined>();
  const { token } = useTokenContext();
  const { toast } = useToast();

  async function getRooms() {
    await axios.get('http://localhost:8080/room', { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }})
    .then(function (response) {
      setRoom(response.data.data);
    })
    .catch(function (error) {
      toast({
        description: error.response.data.message,
        variant: 'default',
      });
    });
  };

  async function deleteRoom(id: string) {
    await axios.delete(`http://localhost:8080/room/${id}`, { headers: { 'Authorization': `Bearer ${token}` }})
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
    if (token) getRooms();
  }, [token, deleteRoom]);

  return (
    <Table>
      <TableCaption>A list of your room type.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Room Type</TableHead>
          <TableHead>Room Number</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {room ? room.map((data) => {
        const query = {
          id: data.id,
          number: data.number,
          price: data.roomTypeId,
        };
        
        const stringifyQuery = qs.stringify(query, { addQueryPrefix: true });
        return (
          <TableRow key={data.id}>
            <TableCell>{data.roomType.name}</TableCell>
            <TableCell>{data.number}</TableCell>
            <TableCell className={cn('space-y-2 lg:space-y-0 lg:space-x-2')}>
              <Link href={`/dashboard/room/edit${stringifyQuery}`}><Button size='sm'>Edit</Button></Link>
              <Button variant='destructive' size='sm' onClick={() => deleteRoom(data.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        )}): ''}
      </TableBody>
    </Table>
  );
};