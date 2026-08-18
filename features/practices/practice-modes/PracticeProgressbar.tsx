import { Progress } from "@/components/ui/progress";

type Props = {
  current: number;
  total: number;
};

export const PracticeProgressbar = ({ current, total }: Props) => {
  const value = total === 0 ? 0 : (current / total) * 100;

  return <Progress value={value} />;
};
