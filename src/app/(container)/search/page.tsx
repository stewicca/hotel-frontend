import axios from 'axios';
import { cn } from '@/lib/utils';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import AvailableRoom from '@/components/container/search/AvailableRoom';
import SearchRoomForm from '@/components/container/search/SearchRoomForm';

async function getAvailableRoomData(checkInDate: any, checkOutDate: any) {
  const response = await axios.post('http://localhost:8080/filtering', { checkInDate, checkOutDate }, { headers: { 'Content-Type': 'application/json' }})
    .then(function (response) {
      return response.data.room;
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
  return response;
};

export default async function Search({ searchParams }: { searchParams: { [key: string]: string | undefined }}) {
  const availableRoomData = await getAvailableRoomData(searchParams.from ?? '', searchParams.to ?? '');

  return (
    <>
      <Navbar />
      <main className={cn('mb-auto')}>
        <SearchRoomForm searchParams={searchParams} />
        <AvailableRoom data={availableRoomData} searchParams={searchParams} />
      </main>
      <Footer />
    </>
  );
};
