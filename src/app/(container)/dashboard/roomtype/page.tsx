import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/container/dashboard/Sidebar';
import RoomTypeList from '@/components/container/dashboard/roomtype/RoomTypeList';
import RoomTypeClientComponent from '@/components/container/dashboard/roomtype/RoomTypeClientComponent';

export default function RoomType() {
  return (
    <RoomTypeClientComponent>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 min-h-screen border-2 border-gray-200 border-dashed rounded-lg">
          <Link href='/dashboard/roomtype/add'><Button>Create New</Button></Link>
          <RoomTypeList />
        </div>
      </div>
    </RoomTypeClientComponent>
  );
};