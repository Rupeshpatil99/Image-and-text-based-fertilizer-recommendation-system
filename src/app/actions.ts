'use server';

import { z } from 'zod';
import { fertilizerRecommendationFromImageAndText } from '@/ai/flows/fertilizer-recommendation-from-image-and-text';
import { predictTopFertilizerProducts } from '@/ai/flows/top-fertilizer-product-prediction';
import type { FertilizerRecommendationFromImageAndTextOutput } from '@/ai/flows/fertilizer-recommendation-from-image-and-text';
import type { TopFertilizerProductPredictionOutput } from '@/ai/flows/top-fertilizer-product-prediction';


const recommendationSchema = z.object({
  photo: z.instanceof(File).refine(file => file.size > 0, 'Image is required.'),
  fieldConditions: z.string().min(10, 'Field conditions must be at least 10 characters.'),
  priorInputs: z.string().min(10, 'Prior inputs must be at least 10 characters.'),
});

export interface RecommendationResult {
  recommendation: FertilizerRecommendationFromImageAndTextOutput;
  products: TopFertilizerProductPredictionOutput;
}

export async function getAiRecommendations(
  prevState: any,
  formData: FormData
): Promise<{ data: RecommendationResult | null; error: string | null }> {
  
  const validatedFields = recommendationSchema.safeParse({
    photo: formData.get('photo'),
    fieldConditions: formData.get('fieldConditions'),
    priorInputs: formData.get('priorInputs'),
  });

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors.map(e => e.message).join(' ');
    return { data: null, error: errorMessages || 'Invalid form data.' };
  }
  
  const { photo, fieldConditions, priorInputs } = validatedFields.data;

  let photoDataUri: string;
  try {
    const buffer = await photo.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    photoDataUri = `data:${photo.type};base64,${base64}`;
  } catch (error) {
    console.error('Error processing image:', error);
    return { data: null, error: 'Failed to process image file.' };
  }


  const aiInput = { photoDataUri, fieldConditions, priorInputs };

  try {
    const [recommendation, products] = await Promise.all([
      fertilizerRecommendationFromImageAndText(aiInput),
      predictTopFertilizerProducts(aiInput),
    ]);

    if (!recommendation || !products) {
      throw new Error('AI failed to generate a complete response.');
    }

    return { data: { recommendation, products }, error: null };
  } catch (error) {
    console.error('AI Flow Error:', error);
    return { data: null, error: 'An unexpected error occurred while getting AI recommendations. Please try again.' };
  }
}

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check the form and try again.',
      success: false,
    };
  }

  // TODO: Implement actual email sending logic here (e.g., using Resend, SendGrid).
  // For this example, we'll just log the data to the server console.
  console.log('New Contact Form Submission:');
  console.log(validatedFields.data);

  return { message: 'Thank you for your message! We will get back to you soon.', success: true, errors: undefined };
}
