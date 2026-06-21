// import { notFound } from "next/navigation";

import { CategoryWordList } from "@/features/word/word-list/CategoryWordList";
import { getWords } from "@/lib/data/getWords";

type Props = {
  params: Promise<{ categoryId: string }>;
};

const CategoryIdPage = async ({ params }: Props) => {
  const { categoryId } = await params;

  const words = await getWords(+categoryId);

  // if (!categoryId) {
  //   notFound();
  // }

  return (
    <div className="px-30">
      <CategoryWordList words={words} />
    </div>
  );
};

export default CategoryIdPage;
