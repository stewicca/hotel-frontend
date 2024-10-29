import Sidebar from '@/components/container/dashboard/Sidebar';
import AddUserForm from '@/components/container/dashboard/user/AddUserForm';
import UserClientComponent from '@/components/container/dashboard/user/UserClientComponent';

export default function AddUser() {
  return (
    <UserClientComponent>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 min-h-screen border-2 border-gray-200 border-dashed rounded-lg">
          <AddUserForm />
        </div>
      </div>
    </UserClientComponent>
  );
};