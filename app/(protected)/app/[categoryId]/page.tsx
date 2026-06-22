import { notFound } from "next/navigation";

import { CategoryWordList } from "@/features/word/word-list/CategoryWordList";
import { getCategoryById } from "@/lib/data/getCategoryById";
import { getWords } from "@/lib/data/getWords";

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

  const words = await getWords(id);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-10">
      <CategoryWordList words={words} />
    </div>
  );
};

export default CategoryIdPage;
