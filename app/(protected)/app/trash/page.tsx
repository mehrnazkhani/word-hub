import { EmptyUI } from "@/components/EmptyUI";
import { CategoryWordList } from "@/features/word/word-list/CategoryWordList";
import { getDeletedWords } from "@/lib/data/getWords";

const TrashPage = async () => {
  const words = await getDeletedWords();

  if (words.length === 0)
    return (
      <EmptyUI
        title="Trash is empty"
        description="Deleted words will appear here."
      />
    );

  return <CategoryWordList words={words} />;
};

export default TrashPage;
