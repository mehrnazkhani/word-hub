export type FillQuestionOption = {
  id: number;
  word: string;
};

export type FillQuestion = {
  id: number;
  exampleBefore: string;
  exampleAfter: string;
  options: FillQuestionOption[];
  correctOptionId: number;
};
