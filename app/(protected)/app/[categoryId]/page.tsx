import { notFound } from "next/navigation";

import { CategoryWordList } from "@/features/word/word-list/category-word/CategoryWordList";

type Props = { params: Promise<{ categoryId: string }> };

const CategoryIdPage = async ({ params }: Props) => {
  const { categoryId } = await params;
  const id = Number(categoryId);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  return <CategoryWordList categoryId={id} />;
};

export default CategoryIdPage;
