"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { WordListContainer } from "@/features/word/word-list/WordListContainer";
import { WordAccordion } from "../../word-accordion/WordAccordion";
import { RecentWordContextMenu } from "./RecentWordContextMenu";
import { WordItem } from "../WordItem";
import { EmptyUI } from "@/components/EmptyUI";

import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { recentWordsQueryOptions } from "@/queries/words/resent/recentWordsQueryOptions";

export const RecentWordList = () => {
  const supabase = useSupabase();
  const { user } = useUser();

  const { data: recentWords } = useSuspenseQuery(
    recentWordsQueryOptions({
      supabase,
      userId: user!.id,
      limit: 20,
    }),
  );

  if (recentWords.length === 0) {
    return (
      <EmptyUI
        title="No words yet"
        description="Recently added words will appear here."
      />
    );
  }

  return (
    <WordListContainer>
      <WordAccordion>
        {recentWords.map((word) => (
          <WordItem
            key={word.id}
            word={word}
            menu={RecentWordContextMenu}
          />
        ))}
      </WordAccordion>
    </WordListContainer>
  );
};
