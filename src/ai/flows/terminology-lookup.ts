'use server';

/**
 * @fileOverview This file defines a Genkit flow for looking up accounting terminology.
 *
 * - terminologyLookup - An async function that accepts a term and returns its definition.
 * - TerminologyLookupInput - The input type for the terminologyLookup function.
 * - TerminologyLookupOutput - The return type for the terminologyLookup function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TerminologyLookupInputSchema = z.object({
  term: z.string().describe('The accounting term to look up.'),
});
export type TerminologyLookupInput = z.infer<typeof TerminologyLookupInputSchema>;

const TerminologyLookupOutputSchema = z.object({
  isAccountingTerm: z
    .boolean()
    .describe('Whether the provided term is likely to be accounting terminology.'),
  definition: z.string().describe('The definition of the accounting term.'),
});
export type TerminologyLookupOutput = z.infer<typeof TerminologyLookupOutputSchema>;

export async function terminologyLookup(input: TerminologyLookupInput): Promise<TerminologyLookupOutput> {
  return terminologyLookupFlow(input);
}

const terminologyLookupPrompt = ai.definePrompt({
  name: 'terminologyLookupPrompt',
  input: {schema: TerminologyLookupInputSchema},
  output: {schema: TerminologyLookupOutputSchema},
  prompt: `You are an expert accountant. A user will provide a term, and you will provide a definition of the term if it is likely to be accounting terminology.  If it is not likely to be accounting terminology, isAccountingTerm should be false, and the definition should be an empty string.

Term: {{{term}}}`,
});

const terminologyLookupFlow = ai.defineFlow(
  {
    name: 'terminologyLookupFlow',
    inputSchema: TerminologyLookupInputSchema,
    outputSchema: TerminologyLookupOutputSchema,
  },
  async input => {
    const {output} = await terminologyLookupPrompt(input);
    return output!;
  }
);
