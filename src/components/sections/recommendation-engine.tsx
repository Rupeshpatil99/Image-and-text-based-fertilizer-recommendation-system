'use client';

import { useEffect, useState, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { getAiRecommendations, type RecommendationResult } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/submit-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Upload, X, Leaf, FlaskConical, CheckCircle2, List } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const initialState: {
  data: RecommendationResult | null;
  error: string | null;
} = {
  data: null,
  error: null,
};

export default function RecommendationEngine() {
  const [state, formAction] = useActionState(getAiRecommendations, initialState);
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  useEffect(() => {
    if (state.data) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.data]);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  return (
    <section id="recommendation-engine" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">Get Your Recommendation</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Fill out the form below to receive a personalized fertilizer recommendation from our AI expert.
          </p>
        </div>
        
        <Card className="mt-12 max-w-4xl mx-auto">
          <form action={formAction}>
            <CardContent className="p-6 grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div>
                    <Label htmlFor="photo" className="text-lg font-semibold font-headline">Crop Image</Label>
                    <p className="text-sm text-muted-foreground mb-2">Upload a clear photo of your crop.</p>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10 relative">
                        {imagePreview ? (
                            <>
                                <Image src={imagePreview} alt="Crop preview" fill className="object-contain rounded-lg" />
                                <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10 bg-card/50 hover:bg-card" onClick={clearImage}>
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Remove image</span>
                                </Button>
                            </>
                        ) : (
                            <div className="text-center">
                                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                                <Label htmlFor="photo" className="relative cursor-pointer rounded-md font-semibold text-accent focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-accent/90">
                                    <span>Upload a file</span>
                                    <Input id="photo" name="photo" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} ref={fileInputRef} required />
                                </Label>
                                <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        )}
                    </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="fieldConditions" className="text-lg font-semibold font-headline">Field Conditions</Label>
                   <p className="text-sm text-muted-foreground mb-2">e.g., soil type, moisture level, recent weather.</p>
                  <Textarea id="fieldConditions" name="fieldConditions" placeholder="Describe your field conditions..." rows={5} required />
                </div>
                <div>
                  <Label htmlFor="priorInputs" className="text-lg font-semibold font-headline">Prior Inputs</Label>
                  <p className="text-sm text-muted-foreground mb-2">e.g., previous fertilizers, compost, soil amendments.</p>
                  <Textarea id="priorInputs" name="priorInputs" placeholder="List any inputs applied in the last season..." rows={5} required />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton pendingText="Analyzing..." className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">Get AI Recommendation</SubmitButton>
            </CardFooter>
            
            <div ref={resultsRef} className="max-w-4xl mx-auto">
              <FormStatusAndResults data={state.data} />
            </div>
          </form>
        </Card>

      </div>
    </section>
  );
}

function FormStatusAndResults({ data }: { data: RecommendationResult | null }) {
    const { pending } = useFormStatus();

    if (pending) {
        return (
            <div className="space-y-8 p-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start space-x-4">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>
                         <div className="flex items-start space-x-4">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!data) {
        return null;
    }

    const { recommendation, products } = data;

    return (
        <div className="space-y-8 animate-in fade-in-50 duration-500 p-6">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><CheckCircle2 className="text-primary"/> AI Recommendation</CardTitle>
                    <CardDescription>{recommendation.reasoning}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 text-lg">
                   <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-2 rounded-full"><Leaf className="h-6 w-6 text-primary" /></div>
                        <div>
                            <p className="text-sm text-muted-foreground">Fertilizer Type</p>
                            <p className="font-semibold">{recommendation.fertilizerType}</p>
                        </div>
                   </div>
                   <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-2 rounded-full"><FlaskConical className="h-6 w-6 text-primary" /></div>
                        <div>
                            <p className="text-sm text-muted-foreground">Recommended Quantity</p>
                            <p className="font-semibold">{recommendation.quantity}</p>
                        </div>
                   </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><List className="text-primary"/> Top Product Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {products.map((product, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-lg font-semibold">{product.productName}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
                                    {product.suitabilityExplanation}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
