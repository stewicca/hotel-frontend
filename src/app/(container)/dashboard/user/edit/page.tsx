import Sidebar from '@/components/container/dashboard/Sidebar';
import EditUserForm from '@/components/container/dashboard/user/EditUserForm';
import UserClientComponent from '@/components/container/dashboard/user/UserClientComponent';

export default function EditUser({ searchParams }: { searchParams: { [key: string]: string | undefined }}) {
  return (
    <UserClientComponent>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 min-h-screen border-2 border-gray-200 border-dashed rounded-lg">
          <EditUserForm user={searchParams} />
        </div>
      </div>
    </UserClientComponent>
  );
};