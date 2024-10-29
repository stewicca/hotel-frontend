import Sidebar from '@/components/container/dashboard/Sidebar';
import AddRoomForm from '@/components/container/dashboard/room/AddRoomForm';
import RoomClientComponent from '@/components/container/dashboard/room/RoomClientComponent';

export default function AddRoom() {
  return (
    <RoomClientComponent>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 min-h-screen border-2 border-gray-200 border-dashed rounded-lg">
          <AddRoomForm />
        </div>
      </div>
    </RoomClientComponent>
  );
};