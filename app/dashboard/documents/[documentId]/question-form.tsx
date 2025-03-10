"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";

const formSchema = z.object({
    text: z.string().min(2),
  });
export function QuestionForm({ documentId }: { documentId: Id<"documents"> }) {
  const askQuestion = useAction(api.documents.askQuestion);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await askQuestion({ documentId: documentId, question: values.text })
    form.reset();
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex gap-2">
      <FormField
        control={form.control}
        name="text"
        render={({ field }) => (
          <FormItem className="flex flex-1">
            {/* <FormLabel>Document Title</FormLabel> */}
            <FormControl>
              <Input placeholder="Ask a question" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
     
      <LoadingButton loadingText="Submitting..." isLoading={form.formState.isSubmitting}>
          Submit
      </LoadingButton>
    </form>
  </Form>
  );
}
