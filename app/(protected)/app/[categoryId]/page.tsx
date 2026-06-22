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

  return <CategoryWordList words={words} />;
};

export default CategoryIdPage;
