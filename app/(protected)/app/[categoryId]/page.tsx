import { notFound } from "next/navigation";

import { CategoryWordList } from "@/features/word/word-list/CategoryWordList";
import { getCategoryById } from "@/lib/data/getCategoryById";
import { getActiveWords } from "@/lib/data/getWords";
import { EmptyUI } from "@/components/EmptyUI";

type Props = {
  params: Promise<{ categoryId: string }>;
};

const CategoryIdPage = async ({ params }: Props) => {
  const { categoryId } = await params;

  if (categoryId === "drop") {
    const words = await getActiveWords(null);

    if (words.length === 0) {
      return (
        <EmptyUI
          title="No words in Drop yet"
          description="Words without a category will appear here."
        />
      );
    }

    return <CategoryWordList words={words} categoryId="drop" />;
  }

  const id = Number(categoryId);

  if (!Number.isSafeInteger(id) || id <= 0) {
    notFound();
  }

  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  const words = await getActiveWords(id);

  if (words.length === 0)
    return (
      <EmptyUI
        title="No words yet"
        description="This category doesn’t have any words yet. Start by adding your first word."
      />
    );

  return <CategoryWordList words={words} categoryId={id} />;
};

export default CategoryIdPage;
