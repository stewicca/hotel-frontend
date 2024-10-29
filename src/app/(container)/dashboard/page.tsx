import Sidebar from '@/components/container/dashboard/Sidebar';
import DashboardContent from '@/components/container/dashboard/DashboardContent';
import DashboardClientComponent from '@/components/container/dashboard/DashboardClientComponent';

export default function Dashboard() {
  return (
    <DashboardClientComponent>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 min-h-screen border-2 border-gray-200 border-dashed rounded-lg">
          <DashboardContent />
        </div>
      </div>
    </DashboardClientComponent>
  );
};