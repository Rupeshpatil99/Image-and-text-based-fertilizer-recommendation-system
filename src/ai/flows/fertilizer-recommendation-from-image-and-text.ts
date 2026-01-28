'use server';

/**
 * @fileOverview A fertilizer recommendation AI agent based on image and text input.
 *
 * - fertilizerRecommendationFromImageAndText - A function that handles the fertilizer recommendation process.
 * - FertilizerRecommendationFromImageAndTextInput - The input type for the fertilizerRecommendationFromImageAndText function.
 * - FertilizerRecommendationFromImageAndTextOutput - The return type for the fertilizerRecommendationFromImageAndText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FertilizerRecommendationFromImageAndTextInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the crops, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  fieldConditions: z.string().describe('The description of the field conditions.'),
  priorInputs: z.string().describe('Details about prior inputs to the field.'),
});
export type FertilizerRecommendationFromImageAndTextInput = z.infer<
  typeof FertilizerRecommendationFromImageAndTextInputSchema
>;

const FertilizerRecommendationFromImageAndTextOutputSchema = z.object({
  fertilizerType: z.string().describe('The recommended type of fertilizer to use.'),
  quantity: z.string().describe('The recommended quantity of fertilizer to use.'),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the fertilizer recommendation.'),
});
export type FertilizerRecommendationFromImageAndTextOutput = z.infer<
  typeof FertilizerRecommendationFromImageAndTextOutputSchema
>;

export async function fertilizerRecommendationFromImageAndText(
  input: FertilizerRecommendationFromImageAndTextInput
): Promise<FertilizerRecommendationFromImageAndTextOutput> {
  return fertilizerRecommendationFromImageAndTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fertilizerRecommendationFromImageAndTextPrompt',
  input: {schema: FertilizerRecommendationFromImageAndTextInputSchema},
  output: {schema: FertilizerRecommendationFromImageAndTextOutputSchema},
  prompt: `You are an expert agricultural advisor specializing in fertilizer recommendations. Based on the image of the crops and the details of the field conditions and prior inputs, you will recommend the best type and quantity of fertilizer to use.

Use the following information to determine the fertilizer recommendation:

Field Conditions: {{{fieldConditions}}}
Prior Inputs: {{{priorInputs}}}
Crop Image: {{media url=photoDataUri}}

Provide a clear recommendation, including the fertilizer type, quantity, and your reasoning behind the recommendation.`,
});

const fertilizerRecommendationFromImageAndTextFlow = ai.defineFlow(
  {
    name: 'fertilizerRecommendationFromImageAndTextFlow',
    inputSchema: FertilizerRecommendationFromImageAndTextInputSchema,
    outputSchema: FertilizerRecommendationFromImageAndTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
