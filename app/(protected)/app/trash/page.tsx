"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { EmptyUI } from "@/components/EmptyUI";
import { DeletedWordList } from "@/features/word/word-list/deleted-word/DeletedWordList";
import { WordListContainer } from "@/features/word/word-list/WordListContainer";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { deletedWordsQueryOptions } from "@/queries/words/deletedWordsQueryOptions";

const TrashPage = () => {
  const supabase = useSupabase();
  const { user } = useUser();

  const { data: words } = useSuspenseQuery(
    deletedWordsQueryOptions({
      supabase,
      userId: user!.id,
    }),
  );

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
