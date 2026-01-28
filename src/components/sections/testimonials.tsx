import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Maria S.",
    title: "Family Farmer",
    quote: "FertilAIze revolutionized how we manage our soil. The recommendations are spot-on, and we've seen a 20% increase in yield this season. It's like having an agronomist in your pocket!",
  },
  {
    id: "testimonial-2",
    name: "John D.",
    title: "Commercial Grower",
    quote: "The product predictions save me hours of research. I can trust the AI to suggest effective and cost-efficient fertilizers, which has significantly improved my bottom line.",
  },
  {
    id: "testimonial-3",
    name: "Dr. Emily R.",
    title: "Agricultural Researcher",
    quote: "A powerful tool for modern agriculture. The data-driven approach of FertilAIze aligns with sustainable farming practices, helping farmers optimize nutrient use and minimize environmental impact.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">Trusted by Growers and Experts</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear what others are saying about FertilAIze.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-4xl mx-auto mt-12"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const image = PlaceHolderImages.find(img => img.id === testimonial.id);
              return (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex flex-col h-full">
                      <CardContent className="flex-1 flex flex-col items-center text-center p-6">
                        <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                        </div>
                        <p className="text-muted-foreground flex-1">"{testimonial.quote}"</p>
                        <div className="mt-6">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={`Photo of ${testimonial.name}`}
                              data-ai-hint={image.imageHint}
                              width={64}
                              height={64}
                              className="rounded-full mx-auto"
                            />
                          )}
                          <p className="font-semibold mt-4">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
