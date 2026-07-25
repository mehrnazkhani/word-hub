"use client";

import { useRecentWords } from "@/queries/words/resent/useRecentWords";
import { WordListContainer } from "@/features/word/word-list/WordListContainer";
import { WordAccordion } from "../../word-accordion/WordAccordion";
import { RecentWordContextMenu } from "./RecentWordContextMenu";
import { WordItem } from "../WordItem";
import { WordsLoading } from "@/components/WordsLoading";

export const RecentWordList = () => {
  const { data: recentWords, isPending } = useRecentWords({ limit: 20 });

  if (isPending) return <WordsLoading />;

  return (
    <WordListContainer>
      <WordAccordion>
        {recentWords &&
          recentWords.map((word) => (
            <WordItem
              key={word.id}
              word={word}
              renderContextMenu={(children) => (
                <RecentWordContextMenu word={word}>
                  {children}
                </RecentWordContextMenu>
              )}
            />
          ))}
      </WordAccordion>
    </WordListContainer>
  );
};
