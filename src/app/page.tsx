import axios from 'axios';
import { cn } from '@/lib/utils';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import OurRooms from '@/components/container/home/OurRooms';
import HomeHeader from '@/components/container/home/HomeHeader';
import HomeClientComponent from '@/components/container/home/HomeClientComponent';

async function getRoomTypeData() {
  const response = await axios.get('http://localhost:8080/roomtype')
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      localStorage.setItem('message', error.response.data.message);
    });
  return response;
};

export default async function Home() {
  const roomTypeData: any = await getRoomTypeData();
  return (
    <HomeClientComponent>
      <Navbar />
      <main className={cn('mb-auto')}>
        <HomeHeader />
        <OurRooms data={roomTypeData} />
      </main>
      <Footer />
    </HomeClientComponent>
  );
};
