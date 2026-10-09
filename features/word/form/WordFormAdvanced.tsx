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
    <Collapsible className="col-span-4 min-w-0">
      <CollapsibleTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="group w-full cursor-pointer justify-center px-2.5 text-xs hover:bg-transparent data-[state=open]:bg-transparent"
        >
          Advanced
          <ChevronDown className="h-4 w-4 transition-transform duration-500 group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="min-w-0 overflow-hidden pt-2">
        <div className="w-full min-w-0 space-y-4">
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <RelatedWordsInput
                name="synonyms"
                label="Synonyms"
                placeholder="e.g. hi, greetings"
              />
            </div>
            <div className="min-w-0">
              <RelatedWordsInput
                name="antonyms"
                label="Antonyms"
                placeholder="e.g. goodbye"
              />
            </div>
          </div>

          <FormTextarea
            name="example"
            label="Example"
            placeholder="e.g. She waved and said hello."
            rows={2}
          />

          <FormTextarea
            name="description"
            label="Description"
            placeholder="e.g. A greeting when meeting someone."
            rows={2}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
