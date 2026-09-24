"use client";
import { FormTextarea } from "@/components/inputs/FormTextarea";
import { RelatedWordsInput } from "@/components/inputs/RelatedWordsInput";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";

export const WordFormAdvanced = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Collapsible className="col-span-4">
      <CollapsibleTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="group cursor-pointer justify-start px-2.5 text-xs hover:bg-transparent data-[state=open]:bg-transparent"
        >
          Advanced
          <ChevronDown className="h-4 w-4 transition-transform duration-500 group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="space-y-4">
          <RelatedWordsInput name="synonyms" placeholder="Synonyms" />
          <RelatedWordsInput name="antonyms" placeholder="Antonyms" />

          <FormTextarea
            name="example"
            label="Example"
            placeholder="Example"
            rows={2}
          />

          <FormTextarea
            name="description"
            label="Description"
            placeholder="Description"
            rows={2}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
