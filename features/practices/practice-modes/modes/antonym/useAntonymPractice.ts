"use client";

import { useMemo, useReducer } from "react";

import type { AntonymQuestion } from "./types";

// Any incorrect pick makes the question incorrect; otherwise the selection
// only contains correct antonyms and the question is correct, even when not
// every antonym was picked. `reveal` guarantees at least one selection.
const hasOnlyCorrectSelections = (selected: string[], antonyms: string[]) =>
  selected.every((value) => antonyms.includes(value));

type State = {
  selections: Record<number, string[]>;
  revealed: Record<number, true>;
  results: Record<number, boolean>;
  isCompleted: boolean;
};

type Action =
  | { type: "pick"; questionId: number; value: string }
  | { type: "reveal"; questionId: number; antonyms: string[] }
  | { type: "complete" };

const initialState: State = {
  selections: {},
  revealed: {},
  results: {},
  isCompleted: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "pick": {
      // Selections are final once the answer is revealed.
      if (state.revealed[action.questionId]) return state;

      const selected = state.selections[action.questionId] ?? [];

      // Picks are final — a picked option cannot be unpicked.
      if (selected.includes(action.value)) return state;

      return {
        ...state,
        selections: {
          ...state.selections,
          [action.questionId]: [...selected, action.value],
        },
      };
    }

    case "reveal": {
      // The first reveal is final for each question.
      if (state.revealed[action.questionId]) return state;

      const selected = state.selections[action.questionId] ?? [];

      // Nothing to score when the question is left without any selection.
      if (selected.length === 0) return state;

      return {
        ...state,
        revealed: { ...state.revealed, [action.questionId]: true },
        results: {
          ...state.results,
          [action.questionId]: hasOnlyCorrectSelections(
            selected,
            action.antonyms,
          ),
        },
      };
    }

    case "complete":
      return { ...state, isCompleted: true };

    default:
      return state;
  }
}

/**
 * Tracks multi-select answers for the antonym practice. Each pick is stored
 * as-is (options are graded visually in the component), and `reveal` settles
 * a question with its final result: only correct antonyms picked means
 * correct, while any incorrect pick means incorrect. A question is settled
 * only on reveal or when it is left unfinished, so the questionnaire's own
 * navigation can never skip scoring.
 */
export const useAntonymPractice = (questions: AntonymQuestion[]) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selections, revealed, results, isCompleted } = state;

  const correctCount = useMemo(
    () => questions.filter((question) => results[question.id] === true).length,
    [questions, results],
  );

  const incorrectCount = useMemo(
    () => questions.filter((question) => results[question.id] === false).length,
    [questions, results],
  );

  const pickOption = (question: AntonymQuestion, value: string) =>
    dispatch({ type: "pick", questionId: question.id, value });

  const reveal = (question: AntonymQuestion) =>
    dispatch({
      type: "reveal",
      questionId: question.id,
      antonyms: question.antonyms,
    });

  const complete = () => dispatch({ type: "complete" });

  return {
    selections,
    revealed,
    results,
    isCompleted,
    correctCount,
    incorrectCount,
    pickOption,
    reveal,
    complete,
  };
};
