'use server';

/**
 * @fileOverview An AI agent that provides financial advice.
 *
 * - getFinancialAdvice - A function that gets financial advice.
 * - GetFinancialAdviceInput - The input type for the getFinancialAdvice function.
 * - GetFinancialAdviceOutput - The return type for the getFinancialAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetFinancialAdviceInputSchema = z.object({
  query: z.string().describe('The query to the financial advice chatbot.'),
});
export type GetFinancialAdviceInput = z.infer<typeof GetFinancialAdviceInputSchema>;

const GetFinancialAdviceOutputSchema = z.object({
  advice: z.string().describe('The advice provided by the chatbot.'),
});
export type GetFinancialAdviceOutput = z.infer<typeof GetFinancialAdviceOutputSchema>;

export async function getFinancialAdvice(input: GetFinancialAdviceInput): Promise<GetFinancialAdviceOutput> {
  return getFinancialAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialAdvicePrompt',
  input: {schema: GetFinancialAdviceInputSchema},
  output: {schema: GetFinancialAdviceOutputSchema},
  prompt: `You are a financial advisor specializing in accounting and tax-related questions. Please provide advice based on the user's query. If the query is not related to accounting or tax, respond that you can only answer accounting and tax-related questions.\n\nQuery: {{{query}}}`,
});

const getFinancialAdviceFlow = ai.defineFlow(
  {
    name: 'getFinancialAdviceFlow',
    inputSchema: GetFinancialAdviceInputSchema,
    outputSchema: GetFinancialAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
