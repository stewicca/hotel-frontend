import Sidebar from '@/components/container/dashboard/Sidebar';
import EditRoomTypeForm from '@/components/container/dashboard/roomtype/EditRoomTypeForm';
import RoomTypeClientComponent from '@/components/container/dashboard/roomtype/RoomTypeClientComponent';

export default function EditRoomType({ searchParams }: { searchParams: { [key: string]: string | undefined }}) {
  return (
    <RoomTypeClientComponent>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 min-h-screen border-2 border-gray-200 border-dashed rounded-lg">
          <EditRoomTypeForm roomType={searchParams} />
        </div>
      </div>
    </RoomTypeClientComponent>
  );
};