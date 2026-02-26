import InteractiveHero from '@/components/hero/InteractiveHero';
import Services from '@/components/sections/Services';
import InstagramFeed from '@/components/sections/InstagramFeed';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <InteractiveHero />
      <Services />
      <InstagramFeed />
      <CTASection />
    </>
  );
}
