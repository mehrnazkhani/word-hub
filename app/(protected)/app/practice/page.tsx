import { PracticeModes } from "@/features/practices/practice-modes/PracticeModes";

export default function PracticePage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-5">
      <PracticeModes />
    </div>
  );
}
