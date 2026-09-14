import About from '../components/home/About';
import Hero from '../components/home/Hero';
import Hours from '../components/home/Hours';
import LocationMap from '../components/home/LocationMap';
import QuickInfoBar from '../components/home/QuickInfoBar';
import Reviews from '../components/home/Reviews';
import MenuSection from '../components/menu/MenuSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickInfoBar />
      <About />
      <MenuSection />
      <Reviews />
      <Hours />
      <LocationMap />
    </>
  );
}
