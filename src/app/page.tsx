import Hero from '@/components/sections/Hero';
import Categories from '@/components/sections/Categories';
import SkinConcerns from '@/components/sections/SkinConcerns';
import NewArrivals from '@/components/sections/NewArrivals';
import BestSellers from '@/components/sections/BestSellers';
import WhyCynkare from '@/components/sections/WhyCynkare';
import Testimonials from '@/components/sections/Testimonials';
import InstagramFeed from '@/components/sections/InstagramFeed';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <SkinConcerns />
      <NewArrivals />
      <BestSellers />
      <WhyCynkare />
      <Testimonials />
      <InstagramFeed />
    </>
  );
}
