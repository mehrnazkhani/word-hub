import { cn } from "@/lib/utils";
import { AiResultCard } from "../AiResultCard";
import type { aiWordDetails } from "@/lib/api/aiWordDetails.api";

type AiResult = Awaited<ReturnType<typeof aiWordDetails>>;

const ResultField = ({
  label,
  value,
  italic,
}: {
  label: string;
  value: string;
  italic?: boolean;
}) => (
  <div className="space-y-1">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className={cn(italic && "italic")}>{value}</p>
  </div>
);

export const WordDetailsResult = ({ result }: { result: AiResult }) => (
  <AiResultCard title="">
    {result.translation && (
      <ResultField label="Translation" value={result.translation} />
    )}

    {result.description && (
      <ResultField label="Description" value={result.description} />
    )}

    {result.synonyms && (
      <ResultField label="Synonyms" value={result.synonyms} />
    )}

    {result.antonyms && (
      <ResultField label="Antonyms" value={result.antonyms} />
    )}

    {result.example && (
      <ResultField label="Example" value={`"${result.example}"`} italic />
    )}
  </AiResultCard>
);
