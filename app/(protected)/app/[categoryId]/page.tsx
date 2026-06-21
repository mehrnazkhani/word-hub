// import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ categoryId: string }>;
};

const CategoryIdPage = async ({ params }: Props) => {
  const { categoryId } = await params;

  // if (!categoryId) {
  //   notFound();
  // }

  return (
    <div>
      <h1>{categoryId}</h1>
    </div>
  );
};

export default CategoryIdPage;
