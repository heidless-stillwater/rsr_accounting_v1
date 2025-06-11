'use server';

/**
 * @fileOverview An invoice generation AI agent.
 *
 * - generateInvoice - A function that handles the invoice generation process.
 * - GenerateInvoiceInput - The input type for the generateInvoice function.
 * - GenerateInvoiceOutput - The return type for the generateInvoice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInvoiceInputSchema = z.object({
  customerName: z.string().describe('The name of the customer.'),
  customerAddress: z.string().describe('The address of the customer.'),
  customerEmail: z.string().email().describe('The email address of the customer.'),
  invoiceItems: z.array(
    z.object({
      description: z.string().describe('Description of the item.'),
      quantity: z.number().describe('Quantity of the item.'),
      unitPrice: z.number().describe('Unit price of the item.'),
    })
  ).describe('A list of invoice items.'),
  companyName: z.string().describe('The name of the company issuing the invoice.'),
  companyAddress: z.string().describe('The address of the company.'),
  companyEmail: z.string().email().describe('The email address of the company.'),
  companyPhone: z.string().describe('The phone number of the company.'),
});
export type GenerateInvoiceInput = z.infer<typeof GenerateInvoiceInputSchema>;

const GenerateInvoiceOutputSchema = z.object({
  invoice: z.string().describe('The generated invoice in a readable format.'),
});
export type GenerateInvoiceOutput = z.infer<typeof GenerateInvoiceOutputSchema>;

export async function generateInvoice(input: GenerateInvoiceInput): Promise<GenerateInvoiceOutput> {
  return generateInvoiceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInvoicePrompt',
  input: {schema: GenerateInvoiceInputSchema},
  output: {schema: GenerateInvoiceOutputSchema},
  prompt: `You are an invoice generation expert. Based on the provided information, generate a professional and well-formatted invoice.

  Customer Information:
  Name: {{{customerName}}}
  Address: {{{customerAddress}}}
  Email: {{{customerEmail}}}

  Company Information:
  Name: {{{companyName}}}
  Address: {{{companyAddress}}}
  Email: {{{companyEmail}}}
  Phone: {{{companyPhone}}}

  Invoice Items:
  {{#each invoiceItems}}
  Description: {{{description}}}, Quantity: {{{quantity}}}, Unit Price: {{{unitPrice}}}
  {{/each}}

  Ensure the invoice includes all necessary details and is easy to understand.
  Do not include any introductory or concluding remarks, just output the text of the invoice.
  `,
});

const generateInvoiceFlow = ai.defineFlow(
  {
    name: 'generateInvoiceFlow',
    inputSchema: GenerateInvoiceInputSchema,
    outputSchema: GenerateInvoiceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
