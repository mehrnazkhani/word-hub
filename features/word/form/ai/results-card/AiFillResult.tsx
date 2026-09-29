import { Skeleton } from "@/components/ui/skeleton";
import { AiResultCard } from "./AiResultCard";
import type { aiFillWord } from "@/lib/api/aiFill.api";

type AiResult = Awaited<ReturnType<typeof aiFillWord>>;

const ResultField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm">{value}</p>
  </div>
);

export const AiFillResultSkeleton = () => (
  <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
    <Skeleton className="h-3 w-1/4" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

export const AiFillResult = ({ result }: { result: AiResult }) => (
  <AiResultCard title="AI Generated">
    {result.translation && (
      <ResultField label="Translation" value={result.translation} />
    )}

    {(result.synonyms || result.antonyms) && (
      <div className="flex gap-4">
        {result.synonyms && (
          <ResultField label="Synonyms" value={result.synonyms} />
        )}
        {result.antonyms && (
          <ResultField label="Antonyms" value={result.antonyms} />
        )}
      </div>
    )}

    {result.example && <ResultField label="Example" value={result.example} />}

    {result.description && (
      <ResultField label="Description" value={result.description} />
    )}
  </AiResultCard>
);
