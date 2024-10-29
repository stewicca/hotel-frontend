import Sidebar from '@/components/container/dashboard/Sidebar';
import EditRoomForm from '@/components/container/dashboard/room/EditRoomForm';
import RoomClientComponent from '@/components/container/dashboard/room/RoomClientComponent';

export default function EditRoom({ searchParams }: { searchParams: { [key: string]: string | undefined }}) {
  return (
    <RoomClientComponent>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 min-h-screen border-2 border-gray-200 border-dashed rounded-lg">
          <EditRoomForm room={searchParams} />
        </div>
      </div>
    </RoomClientComponent>
  );
};