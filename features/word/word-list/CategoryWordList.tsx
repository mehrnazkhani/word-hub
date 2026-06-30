"use client";

import { WordAccordion } from "@/features/word/word-accordion/WordAccordion";
import type { getActiveWords } from "@/lib/data/getWords";
import { WordContextMenu } from "../WordContextMenu";

type CategoryWordListProps = {
  words: Awaited<ReturnType<typeof getActiveWords>>;
  categoryId?: number | string;
};

export const CategoryWordList = ({
  words,
  categoryId,
}: CategoryWordListProps) => {
  const isDrop = categoryId === "drop" || categoryId === null;

  const handleCopy = (wordId: number) => {
    console.log("Copy word:", wordId);
  };
  const handleEdit = (wordId: number) => {
    console.log("Edit word:", wordId);
  };
  const handleMove = (wordId: number, targetCategoryId: number) => {
    console.log("Move word:", { wordId, targetCategoryId });
  };
  const handleDelete = (wordId: number) => {
    console.log("Delete word:", wordId);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 pb-10">
      <WordAccordion>
        {words &&
          words.map((word) => (
            <WordContextMenu
              key={word.id}
              currentCategoryId={isDrop ? null : Number(categoryId)}
              onCopy={() => handleCopy(word.id)}
              onEdit={() => handleEdit(word.id)}
              onMove={(targetCategoryId) =>
                handleMove(word.id, targetCategoryId)
              }
              onDelete={() => handleDelete(word.id)}
            >
              <div className="[&>div]:border-b last:[&>div]:border-b-0">
                <WordAccordion.Item value={`item-${word.id}`} word={word}>
                  <WordAccordion.Trigger>
                    <WordAccordion.Trigger.Left>
                      <WordAccordion.Trigger.WordTitle />
                    </WordAccordion.Trigger.Left>

                    <WordAccordion.Trigger.Right>
                      <WordAccordion.Trigger.Right.IconContainer>
                        <WordAccordion.Trigger.Right.ChevronDown />
                      </WordAccordion.Trigger.Right.IconContainer>
                      <WordAccordion.Trigger.Right.Progress />
                    </WordAccordion.Trigger.Right>
                  </WordAccordion.Trigger>

                  <WordAccordion.Content />

                  <WordAccordion.Footer>
                    <WordAccordion.Footer.Language />
                    <WordAccordion.Footer.Date />
                  </WordAccordion.Footer>
                </WordAccordion.Item>
              </div>
            </WordContextMenu>
          ))}
      </WordAccordion>
    </main>
  );
};
