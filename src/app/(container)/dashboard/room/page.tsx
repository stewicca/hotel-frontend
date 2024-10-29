import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/container/dashboard/Sidebar';
import RoomList from '@/components/container/dashboard/room/RoomList';
import RoomClientComponent from '@/components/container/dashboard/room/RoomClientComponent';

export default function Room() {
  return (
    <RoomClientComponent>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 min-h-screen border-2 border-gray-200 border-dashed rounded-lg">
          <Link href='/dashboard/room/add'><Button>Create New</Button></Link>
          <RoomList />
        </div>
      </div>
    </RoomClientComponent>
  );
};