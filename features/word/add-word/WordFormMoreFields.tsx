"use client";
import { FormInput } from "@/components/inputs/FormInput";
import { FormTextarea } from "@/components/inputs/FormTextarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const WordFormMoreFields = () => {
  return (
    <Collapsible className="col-span-4 space-y-4">
      <CollapsibleTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="group cursor-pointer justify-start px-2.5 hover:bg-transparent data-[state=open]:bg-transparent"
        >
          More Options
          <ChevronDown className="h-4 w-4 transition-transform duration-500 group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <p className="px-2.5 text-xs text-muted-foreground">
          separated by commas (e.g. happy, joyful, glad)
        </p>
        <div className="space-y-4">
          <FormInput name="synonyms" label="Synonyms" placeholder="Synonyms" />
          <FormInput name="antonyms" label="Antonyms" placeholder="Antonyms" />
          <FormTextarea name="example" label="Example" placeholder="Example" />
          <FormTextarea
            name="description"
            label="Description"
            placeholder="Description"
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
