import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import RotatingIconsWrapper from '@/components/RotatingIconsWrapper';
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const SecondaryHero = dynamic(() => import('@/components/SecondaryHero'));
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-4 md:px-12 mt-16">
        <div className="md:order-1">
          <RotatingIconsWrapper />
        </div>
        <div className="md:order-2">
          <HeroSection />
        </div>
      </div>
      <HowItWorks />
      <SecondaryHero />
      <Footer />
    </main>
  );
}
