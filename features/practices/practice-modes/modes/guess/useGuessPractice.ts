"use client";

import { useMemo, useReducer } from "react";

import type { GuessQuestion } from "./types";

type State = {
  answers: Record<number, number>;
  incorrectCount: number;
  isCompleted: boolean;
};

type Action =
  | {
      type: "answer";
      questionId: number;
      optionId: number;
      correctOptionId: number;
    }
  | { type: "complete" };

export const initialState: State = {
  answers: {},
  incorrectCount: 0,
  isCompleted: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "answer": {
      // The first answer is final for each question.
      if (state.answers[action.questionId] !== undefined) return state;

      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.optionId,
        },
        incorrectCount:
          action.optionId === action.correctOptionId
            ? state.incorrectCount
            : state.incorrectCount + 1,
      };
    }

    case "complete":
      return { ...state, isCompleted: true };

    default:
      return state;
  }
}

export const useGuessPractice = (questions: GuessQuestion[]) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { answers, incorrectCount, isCompleted } = state;

  const answeredCount = useMemo(
    () =>
      questions.filter((question) => answers[question.id] !== undefined).length,
    [questions, answers],
  );

  const correctCount = useMemo(
    () =>
      questions.filter(
        (question) => answers[question.id] === question.correctOptionId,
      ).length,
    [questions, answers],
  );

  const selectOption = (question: GuessQuestion, optionId: number) =>
    dispatch({
      type: "answer",
      questionId: question.id,
      optionId,
      correctOptionId: question.correctOptionId,
    });

  const complete = () => dispatch({ type: "complete" });

  return {
    answers,
    incorrectCount,
    isCompleted,
    answeredCount,
    correctCount,
    selectOption,
    complete,
  };
};
