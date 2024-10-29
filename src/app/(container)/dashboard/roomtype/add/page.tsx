import Sidebar from '@/components/container/dashboard/Sidebar';
import AddRoomTypeForm from '@/components/container/dashboard/roomtype/AddRoomTypeForm';
import RoomTypeClientComponent from '@/components/container/dashboard/roomtype/RoomTypeClientComponent';

export default function AddRoomType() {
  return (
    <RoomTypeClientComponent>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 min-h-screen border-2 border-gray-200 border-dashed rounded-lg">
          <AddRoomTypeForm />
        </div>
      </div>
    </RoomTypeClientComponent>
  );
};