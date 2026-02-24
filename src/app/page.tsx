import InteractiveHero from '@/components/hero/InteractiveHero';
import LogoMarquee from '@/components/sections/LogoMarquee';
import Services from '@/components/sections/Services';
import WhyVisionA from '@/components/sections/WhyVisionA';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <InteractiveHero />
      <LogoMarquee />
      <Services />
      <WhyVisionA />
      <FeaturedProjects />
      <Process />
      <Testimonials />
      <CTASection />
    </>
  );
}
