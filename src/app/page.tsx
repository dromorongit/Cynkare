import Hero from '@/components/sections/Hero';
import Categories from '@/components/sections/Categories';
import NewArrivals from '@/components/sections/NewArrivals';
import WhyCynkare from '@/components/sections/WhyCynkare';
import Testimonials from '@/components/sections/Testimonials';
import InstagramFeed from '@/components/sections/InstagramFeed';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <NewArrivals />
      <WhyCynkare />
      <Testimonials />
      <InstagramFeed />
    </>
  );
}
