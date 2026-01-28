import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <section className="relative h-[60vh] min-h-[500px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <div className="container max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold font-headline md:text-6xl">
            Smart Farming, Smarter Yields
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80">
            Harness the power of AI to get precise fertilizer recommendations. Upload a crop image and let our technology guide you to a healthier, more abundant harvest.
          </p>
          <div>
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="#recommendation-engine">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
