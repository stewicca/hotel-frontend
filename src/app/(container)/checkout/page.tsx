import axios from 'axios';
import { cn } from '@/lib/utils';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CheckoutForm from '@/components/container/checkout/CheckoutForm';
import RoomTypeDetail from '@/components/container/checkout/RoomTypeDetail';
import CheckoutClientComponent from '@/components/container/checkout/CheckoutClientComponent';

async function getRoomTypeDetail(id: string) {
  const response = await axios.get(`http://localhost:8080/roomtype/${id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
  return response.data;
};

export default async function Checkout({ searchParams }: { searchParams: { [key: string]: string | undefined }}) {
  const roomTypeDetail = await getRoomTypeDetail(searchParams.id ?? '')
  return (
    <CheckoutClientComponent>
      <Navbar />
      <main className={cn('mb-auto')} >
        <div className={cn('layout flex flex-col-reverse lg:flex-row justify-center lg:justify-normal lg:gap-8')}>
          <CheckoutForm searchParams={searchParams} />
          <RoomTypeDetail data={roomTypeDetail} searchParams={searchParams} />
        </div>
      </main>
      <Footer />
    </CheckoutClientComponent>
  );
};
