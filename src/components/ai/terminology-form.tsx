"use client"
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { terminologyLookup, type TerminologyLookupInput, type TerminologyLookupOutput } from "@/ai/flows/terminology-lookup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const terminologySchema = z.object({
  term: z.string().min(1, "Term cannot be empty."),
});

export function TerminologyForm() {
  const [result, setResult] = useState<TerminologyLookupOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TerminologyLookupInput>({
    resolver: zodResolver(terminologySchema),
    defaultValues: {
      term: "",
    },
  });

  const onSubmit: SubmitHandler<TerminologyLookupInput> = async (data) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await terminologyLookup(data);
      setResult(response);
    } catch (e) {
      setError("An error occurred while fetching the definition. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Accounting Terminology Lookup</CardTitle>
        <CardDescription>Enter an accounting term to get its definition.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Term</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Accrual Basis Accounting" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Look Up
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent>
          {result.isAccountingTerm ? (
            <Alert>
              <AlertTitle className="font-semibold">Definition for "{form.getValues("term")}"</AlertTitle>
              <AlertDescription className="mt-2 whitespace-pre-wrap">{result.definition}</AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <AlertTitle className="font-semibold">Not an Accounting Term</AlertTitle>
              <AlertDescription className="mt-2">The term "{form.getValues("term")}" does not appear to be standard accounting terminology, or no definition was found.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      )}
      {error && (
         <CardContent>
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
         </CardContent>
      )}
    </Card>
  );
}
