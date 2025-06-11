'use server';

/**
 * @fileOverview A bookkeeping assistance AI agent.
 *
 * - bookkeepingAssistance - A function that handles the bookkeeping assistance process.
 * - BookkeepingAssistanceInput - The input type for the bookkeepingAssistance function.
 * - BookkeepingAssistanceOutput - The return type for the bookkeepingAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BookkeepingAssistanceInputSchema = z.object({
  task: z.string().describe('The bookkeeping task the user needs help with.'),
  details: z.string().describe('Additional details about the bookkeeping task.'),
});
export type BookkeepingAssistanceInput = z.infer<typeof BookkeepingAssistanceInputSchema>;

const BookkeepingAssistanceOutputSchema = z.object({
  guidance: z.string().describe('Step-by-step guidance on how to accomplish the bookkeeping task.'),
});
export type BookkeepingAssistanceOutput = z.infer<typeof BookkeepingAssistanceOutputSchema>;

export async function bookkeepingAssistance(
  input: BookkeepingAssistanceInput
): Promise<BookkeepingAssistanceOutput> {
  return bookkeepingAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bookkeepingAssistancePrompt',
  input: {schema: BookkeepingAssistanceInputSchema},
  output: {schema: BookkeepingAssistanceOutputSchema},
  prompt: `You are a helpful assistant for small business owners, skilled in accounting.

  The user is asking for help with a bookkeeping task. Provide a clear, step-by-step guide to help them accomplish the task.

  Task: {{{task}}}
  Details: {{{details}}}
  `,
});

const bookkeepingAssistanceFlow = ai.defineFlow(
  {
    name: 'bookkeepingAssistanceFlow',
    inputSchema: BookkeepingAssistanceInputSchema,
    outputSchema: BookkeepingAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
