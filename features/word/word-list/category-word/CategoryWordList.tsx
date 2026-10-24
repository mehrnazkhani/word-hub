"use client";

import { notFound } from "next/navigation";
import { useSuspenseQueries } from "@tanstack/react-query";

import { WordListContainer } from "../WordListContainer";
import { WordAccordion } from "@/features/word/word-accordion/WordAccordion";
import { WordItem } from "../WordItem";
import { CategoryWordContextMenu } from "./CategoryWordContextMenu";
import { EmptyUI } from "@/components/EmptyUI";

import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { categoryByIdQueryOptions } from "@/queries/categories/categoryQueryOptions";
import { activeWordsQueryOptions } from "@/queries/words/activeWordsQueryOptions";

type CategoryWordListProps = {
  categoryId: number;
};

export const CategoryWordList = ({ categoryId }: CategoryWordListProps) => {
  const supabase = useSupabase();
  const { user } = useUser();

  const [{ data: category }, { data: words }] = useSuspenseQueries({
    queries: [
      categoryByIdQueryOptions({
        supabase,
        userId: user!.id,
        categoryId,
      }),
      activeWordsQueryOptions({
        supabase,
        userId: user!.id,
        categoryId,
      }),
    ],
  });

  if (!category) {
    notFound();
  }

  if (words.length === 0) {
    return (
      <EmptyUI
        title="No words yet"
        description="This category doesn’t have any words yet."
      />
    );
  }

  return (
    <WordListContainer>
      <WordAccordion>
        {words.map((word) => (
          <WordItem
            key={word.id}
            id={`word-${word.id}`}
            word={word}
            renderContextMenu={(children) => (
              <CategoryWordContextMenu word={word}>
                {children}
              </CategoryWordContextMenu>
            )}
          />
        ))}
      </WordAccordion>
    </WordListContainer>
  );
};
