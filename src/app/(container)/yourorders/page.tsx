import { cn } from '@/lib/utils';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import OrderList from '@/components/container/yourorders/OrderList';
import YourOrdersClientComponent from '@/components/container/yourorders/YourOrdersClientComponent';

export default function YourOrders() {
  return (
    <YourOrdersClientComponent>
      <Navbar />
      <main className={cn('mb-auto')}>
        <h1 className={cn('layout mt-8 text-xl font-semibold')}>Your Orders</h1>
        <OrderList />
      </main>
      <Footer />
    </YourOrdersClientComponent>
  );
};