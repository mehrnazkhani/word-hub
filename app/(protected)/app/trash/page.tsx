"use client";

import { EmptyUI } from "@/components/EmptyUI";
import { WordsLoading } from "@/components/WordsLoading";
import { DeletedWordList } from "@/features/word/word-list/deleted-word/DeletedWordList";
import { WordListContainer } from "@/features/word/word-list/WordListContainer";
import { useDeletedWords } from "@/queries/words/useDeletedWords";

const TrashPage = () => {
  const { data: words = [], isPending } = useDeletedWords();

  if (isPending) return <WordsLoading />;

  if (words.length === 0)
    return (
      <EmptyUI
        title="Trash is empty"
        description="Deleted words will appear here."
      />
    );

  return (
    <WordListContainer>
      <DeletedWordList words={words} />
    </WordListContainer>
  );
};

export default TrashPage;
