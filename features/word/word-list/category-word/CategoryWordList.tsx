"use client";

import { notFound } from "next/navigation";

import { WordListContainer } from "../WordListContainer";
import { WordAccordion } from "@/features/word/word-accordion/WordAccordion";
import { WordItem } from "../WordItem";
import { CategoryWordContextMenu } from "./CategoryWordContextMenu";
import { WordsLoading } from "@/components/WordsLoading";
import { EmptyUI } from "@/components/EmptyUI";

import { useActiveWords } from "@/queries/words/useActiveWords";
import { useCategoryById } from "@/queries/categories/useCategoryById";

type CategoryWordListProps = {
  categoryId: string;
};

export const CategoryWordList = ({ categoryId }: CategoryWordListProps) => {
  const id = Number(categoryId);
  validateCategoryId(id);

  const { category, isPending: categoryPending } = useCategoryById(id);
  if (categoryPending) return <WordsLoading />;
  if (!category) {
    notFound();
  }

  const { data: words, isPending: wordsLoading } = useActiveWords(id);
  if (wordsLoading) return <WordsLoading />;

  if (!words || words.length === 0) {
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

function validateCategoryId(id: number): asserts id is number {
  if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
    notFound();
  }
}
