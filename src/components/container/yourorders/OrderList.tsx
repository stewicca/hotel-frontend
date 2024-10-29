'use client'
import axios from 'axios';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useUserContext } from '@/app/user-provider';
import { useTokenContext } from '@/app/token-provider';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Order {
  id: string,
  bookerName: string,
  bookerEmail: string,
  bookingDate: string,
  checkInDate: string,
  checkOutDate: string,
  guestName: string,
  totalRooms: number,
  bookingStatus: string,
  roomtypeId: string,
  userId: string,
  roomType: {
    name: string,
  },
};

export default function OrderList() {
  const [ order, setOrder ] = useState<Order[] | undefined>();
  const { token } = useTokenContext();
  const { user } = useUserContext();
  const { toast } = useToast();

  async function getOrders() {
    await axios.get(`http://localhost:8080/booking/${user?.id}`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }})
    .then(function (response) {
      setOrder(response.data.data);
    })
    .catch(function (error) {
      toast({
        description: error.response.data.message,
        variant: 'violet',
      });
    });
  };

  useEffect(() => {
    if (user && token) getOrders();
  }, [user]);

  return (
    <Table className={cn('layout mt-8 px-4')}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Room Type</TableHead>
          <TableHead>Booking Date</TableHead>
          <TableHead>Check In Date</TableHead>
          <TableHead>Check Out Date</TableHead>
          <TableHead>Guest Name</TableHead>
          <TableHead className={cn("text-right")}>Total Rooms</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order ? order.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.roomType.name}</TableCell>
            <TableCell>{format(new Date(data.bookingDate), "LLL dd, y")}</TableCell>
            <TableCell>{format(new Date(data.checkInDate), "LLL dd, y")}</TableCell>
            <TableCell>{format(new Date(data.checkOutDate), "LLL dd, y")}</TableCell>
            <TableCell>{data.guestName}</TableCell>
            <TableCell className={cn("text-right")}>{data.totalRooms}</TableCell>
            <TableCell>{data.bookingStatus}</TableCell>
          </TableRow>
        )): ''}
      </TableBody>
    </Table>
  );
};