'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/submit-button';

const initialState = {
  message: '',
  success: false,
  errors: undefined,
};

export default function Contact() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="container max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold font-headline sm:text-4xl">Request a Consultation</CardTitle>
            <CardDescription>
              Have questions or need more personalized advice? Fill out the form below and one of our experts will get in touch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
                 {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Tell us about your farm and what you're looking for..." required rows={5} />
                {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message[0]}</p>}
              </div>
              <SubmitButton pendingText="Sending..." className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Submit Request
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
