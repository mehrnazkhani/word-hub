export type GuessQuestionOption = {
  id: number;
  word: string;
};

export type GuessQuestion = {
  id: number;
  description: string;
  options: GuessQuestionOption[];
  correctOptionId: number;
};
