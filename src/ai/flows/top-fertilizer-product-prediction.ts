'use server';
/**
 * @fileOverview Provides a Genkit flow for predicting top fertilizer products based on crop image analysis and field conditions.
 *
 * - predictTopFertilizerProducts - A function that predicts top fertilizer products.
 * - TopFertilizerProductPredictionInput - The input type for the predictTopFertilizerProducts function.
 * - TopFertilizerProductPredictionOutput - The return type for the predictTopFertilizerProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TopFertilizerProductPredictionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  fieldConditions: z.string().describe('Description of the field conditions.'),
  priorInputs: z.string().describe('Details of any prior inputs to the field.'),
});
export type TopFertilizerProductPredictionInput = z.infer<
  typeof TopFertilizerProductPredictionInputSchema
>;

const TopFertilizerProductPredictionOutputSchema = z.array(z.object({
  productName: z.string().describe('The name of the fertilizer product.'),
  suitabilityExplanation: z.string().describe('Explanation of why the product is suitable.'),
}));
export type TopFertilizerProductPredictionOutput = z.infer<
  typeof TopFertilizerProductPredictionOutputSchema
>;

export async function predictTopFertilizerProducts(
  input: TopFertilizerProductPredictionInput
): Promise<TopFertilizerProductPredictionOutput> {
  return predictTopFertilizerProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'topFertilizerProductPredictionPrompt',
  input: {schema: TopFertilizerProductPredictionInputSchema},
  output: {schema: TopFertilizerProductPredictionOutputSchema},
  prompt: `You are an expert in fertilizer recommendations. Based on the image of the crop, the description of the field conditions, and prior inputs, recommend the top fertilizer products.

  Provide a list of the top products with a brief explanation of why each product is suitable.

  Field Conditions: {{{fieldConditions}}}
  Prior Inputs: {{{priorInputs}}}
  Crop Image: {{media url=photoDataUri}}
  `,
});

const predictTopFertilizerProductsFlow = ai.defineFlow(
  {
    name: 'predictTopFertilizerProductsFlow',
    inputSchema: TopFertilizerProductPredictionInputSchema,
    outputSchema: TopFertilizerProductPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
