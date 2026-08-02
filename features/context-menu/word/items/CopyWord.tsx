"use client";

import { Copy } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";
import { getLanguageById } from "@/constants/languages";
import { toast } from "sonner";

export const CopyWord = () => {
  const { word } = useWordContextMenu();
  const sourceLanguage = getLanguageById(word.source_language_id);
  const targetLanguage = getLanguageById(word.target_language_id);

  const handleCopy = async () => {
    const text = [
      [
        sourceLanguage?.flag,
        word.word,
        word.part_of_speech ? `(${word.part_of_speech})` : null,
      ]
        .filter(Boolean)
        .join("  "),
      [targetLanguage?.flag, word.translation].filter(Boolean).join("  "),
      word.synonyms?.length ? `\nSynonyms: ${word.synonyms.join(", ")}` : null,
      word.antonyms?.length ? `Antonyms: ${word.antonyms.join(", ")}` : null,
      word.description ? `Description: ${word.description}` : null,
      sourceLanguage?.label && targetLanguage?.label
        ? `\n${sourceLanguage?.label} → ${targetLanguage.label}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(text);
      toast.success(`"${word.word}" copied to clipboard`);
    } catch {
      toast.error("Failed to copy", {
        description: "Could not access clipboard",
      });
    }
  };

  return (
    <ContextMenuItem onSelect={handleCopy} className="text-sm">
      <Copy className="size-3" />
      Copy
    </ContextMenuItem>
  );
};
