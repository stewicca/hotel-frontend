import Sidebar from '@/components/container/dashboard/Sidebar';
import EditBookingForm from '@/components/container/dashboard/booking/EditBookingForm';
import BookingClientComponent from '@/components/container/dashboard/booking/BookingClientComponent';

export default function EditBooking() {
  return (
    <BookingClientComponent>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 min-h-screen border-2 border-gray-200 border-dashed rounded-lg">
          <EditBookingForm />
        </div>
      </div>
    </BookingClientComponent>
  );
};