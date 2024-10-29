import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/container/dashboard/Sidebar';
import UserList from '@/components/container/dashboard/user/UserList';
import UserClientComponent from '@/components/container/dashboard/user/UserClientComponent';

export default function User() {
  return (
    <UserClientComponent>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 min-h-screen border-2 border-gray-200 border-dashed rounded-lg">
          <Link href='/dashboard/user/add'><Button>Create New</Button></Link>
          <UserList />
        </div>
      </div>
    </UserClientComponent>
  );
};