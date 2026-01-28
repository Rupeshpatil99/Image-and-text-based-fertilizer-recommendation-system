import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Features from '@/components/sections/features';
import RecommendationEngine from '@/components/sections/recommendation-engine';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <RecommendationEngine />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
