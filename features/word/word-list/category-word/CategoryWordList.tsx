"use client";

import { notFound } from "next/navigation";

import { WordListContainer } from "../WordListContainer";
import { WordAccordion } from "@/features/word/word-accordion/WordAccordion";
import { WordItem } from "../WordItem";
import { CategoryWordContextMenu } from "./CategoryWordContextMenu";
import { WordsLoading } from "@/components/WordsLoading";
import { EmptyUI } from "@/components/EmptyUI";

import { useUserCategories } from "@/queries/categories/useCategories";
import { useActiveWords } from "@/queries/words/useActiveWords";
import { findObjectById } from "@/lib/utils/findObjectById";

type CategoryWordListProps = {
  categoryId: string;
};

export const CategoryWordList = ({ categoryId }: CategoryWordListProps) => {
  const id = Number(categoryId);
  validateCategoryId(id);

  const { data: categories = [], isPending: categoriesLoading } =
    useUserCategories();
  if (categoriesLoading) return <WordsLoading />;

  const category = findObjectById(categories, id);
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
