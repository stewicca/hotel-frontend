'use client';
import axios from 'axios';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTokenContext } from '@/app/token-provider';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Booking {
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

export default function BookingList() {
  const [ booking, setBooking ] = useState<Booking[] | undefined>();
  const { token } = useTokenContext();
  const { toast } = useToast();

  async function getBookings() {
    await axios.get('http://localhost:8080/booking', { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }})
    .then(function (response) {
      setBooking(response.data.data);
    })
    .catch(function (error) {
      toast({
        description: error.response.data.message,
        variant: 'violet',
      });
    });
  };

  useEffect(() => {
    if (token) getBookings();
  }, [token]);

  return (
    <Table>
      <TableCaption>A list of your room type.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Room Type</TableHead>
          <TableHead>Booking Date</TableHead>
          <TableHead>Check In Date</TableHead>
          <TableHead>Check Out Date</TableHead>
          <TableHead>Guest Name</TableHead>
          <TableHead className={cn("text-right")}>Total Rooms</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {booking ? booking.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.roomType.name}</TableCell>
            <TableCell>{format(new Date(data.bookingDate), "LLL dd, y")}</TableCell>
            <TableCell>{format(new Date(data.checkInDate), "LLL dd, y")}</TableCell>
            <TableCell>{format(new Date(data.checkOutDate), "LLL dd, y")}</TableCell>
            <TableCell>{data.guestName}</TableCell>
            <TableCell className={cn("text-right")}>{data.totalRooms}</TableCell>
            <TableCell>{data.bookingStatus}</TableCell>
            <TableCell>
              <Link href={`/dashboard/booking/edit/${data.id}`}><Button size='sm'>Edit</Button></Link>
            </TableCell>
          </TableRow>
        )): ''}
      </TableBody>
    </Table>
  );
};