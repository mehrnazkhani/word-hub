import { CategoryWordList } from "@/features/word/word-list/category-word/CategoryWordList";

type Props = { params: Promise<{ categoryId: string }> };

const CategoryIdPage = async ({ params }: Props) => {
  const { categoryId } = await params;

  return <CategoryWordList categoryId={categoryId} />;
};

export default CategoryIdPage;
