"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import {
  Questionnaire,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireProgress,
  QuestionnaireSubmit,
} from "@/components/ui/questionnaire";
import { MAX_WORD_SCORE, MIN_WORDS_REQUIRED } from "@/constants/practice-modes";

import { PracticeContainer } from "../../PracticeContainer";
import { PracticeResultDialog } from "../../PracticeResultDialog";
import { usePracticeSession } from "../../usePracticeSession";
import { usePracticeTimer } from "../../usePracticeTimer";
import { useGuessPractice } from "./useGuessPractice";
import { useGuessQuestions } from "./useGuessQuestions";

import type { CategoryId } from "../../PracticeCategoryList";
import type { PracticeModeWords } from "../../validatePracticeMode";
import type { PracticeModeName } from "@/constants/practice-modes";

const PERSIAN_SCRIPT_PATTERN = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

const getTextDirection = (text: string) =>
  PERSIAN_SCRIPT_PATTERN.test(text) ? "rtl" : "ltr";

type GuessWordPracticeProps = {
  categoryId: CategoryId;
  words: PracticeModeWords;
  practiceMode: PracticeModeName;
};

export const GuessWordPractice = ({
  categoryId,
  words,
  practiceMode,
}: GuessWordPracticeProps) => {
  const questions = useGuessQuestions(words);
  const {
    answers,
    incorrectCount,
    isCompleted,
    correctCount,
    selectOption,
    complete,
  } = useGuessPractice(questions ?? []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const { elapsedSeconds } = usePracticeTimer({ stopWhen: isCompleted });

  const wordsToUpdate = useMemo(() => {
    if (!questions) return [];

    const wordsById = new Map(words.map((word) => [word.id, word]));

    return questions.flatMap((question) => {
      const word = wordsById.get(question.id);
      const selectedOptionId = answers[question.id];

      if (!word || selectedOptionId === undefined) return [];

      const score =
        selectedOptionId === question.correctOptionId
          ? word.score + 1
          : word.score - 1;

      return [
        {
          id: word.id,
          score: Math.min(Math.max(score, 0), MAX_WORD_SCORE),
        },
      ];
    });
  }, [answers, questions, words]);

  usePracticeSession({
    isCompleted,
    elapsedSeconds,
    categoryId,
    practiceMode,
    correctCount,
    incorrectCount,
    totalQuestions: questions?.length ?? 0,
    wordsToUpdate,
  });

  const currentQuestion = questions?.[currentIndex] ?? null;
  const selectedOptionId = currentQuestion
    ? (answers[currentQuestion.id] ?? null)
    : null;

  const handleItemChange = (item: string) => {
    const nextIndex =
      questions?.findIndex((question) => `guess-${question.id}` === item) ?? -1;

    if (nextIndex !== -1) setCurrentIndex(nextIndex);
  };

  if (!questions) {
    return (
      <PracticeContainer current={0} total={0}>
        <main className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </main>
      </PracticeContainer>
    );
  }

  if (questions.length === 0) {
    return (
      <PracticeContainer current={0} total={0}>
        <main className="flex flex-1 items-center justify-center">
          <div className="max-w-sm space-y-2 text-center">
            <h1 className="font-medium">Not enough words</h1>
            <p className="text-sm text-muted-foreground">
              Guess Meaning needs at least {MIN_WORDS_REQUIRED} words with
              descriptions.
            </p>
          </div>
        </main>
      </PracticeContainer>
    );
  }

  if (!currentQuestion) {
    return (
      <PracticeContainer current={questions.length} total={questions.length}>
        <main className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted-foreground">Practice complete</p>
        </main>

        <PracticeResultDialog
          open={showResults}
          onOpenChange={setShowResults}
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          elapsedSeconds={elapsedSeconds}
          totalWords={questions.length}
        />
      </PracticeContainer>
    );
  }

  const hasAnswered = selectedOptionId !== null;
  const isLastQuestion = currentIndex === questions.length - 1;

  const ContinueButton = isLastQuestion
    ? QuestionnaireSubmit
    : QuestionnaireNext;

  return (
    <PracticeContainer current={currentIndex} total={questions.length}>
      <main className="flex flex-1 flex-col justify-center pb-[clamp(24px,6vh,64px)]">
        <Questionnaire
          item={`guess-${currentQuestion.id}`}
          onItemChange={handleItemChange}
          className="gap-16"
          onSubmit={(event) => {
            event.preventDefault();
            if (!isLastQuestion) return;

            setCurrentIndex((index) => index + 1);
            complete();
            setShowResults(true);
          }}
        >
          <div className="mx-auto w-full max-w-xl space-y-1 text-start">
            <QuestionnaireProgress />
            <p className="text-sm text-muted-foreground">
              Read the description and choose the correct word.
            </p>
          </div>

          {questions.map((question) => {
            const selected = answers[question.id] ?? null;
            const answered = selected !== null;
            const direction = getTextDirection(question.description);

            return (
              <QuestionnaireItem
                key={question.id}
                name={`guess-${question.id}`}
                required
                aria-labelledby={`guess-description-${question.id}`}
                className="gap-16"
              >
                <p
                  id={`guess-description-${question.id}`}
                  dir={direction}
                  lang={direction === "rtl" ? "fa" : undefined}
                  className="text-center font-heading text-lg leading-relaxed font-medium text-pretty sm:text-xl"
                >
                  {question.description}
                </p>

                <QuestionnaireChoices
                  inert={answered}
                  aria-disabled={answered}
                  className={cn(
                    "mx-auto grid w-full max-w-xl gap-3",
                    answered && "pointer-events-none",
                  )}
                >
                  {question.options.map((option) => {
                    const isSelected = selected === option.id;
                    const isCorrectOption =
                      option.id === question.correctOptionId;

                    return (
                      <QuestionnaireChoice
                        key={option.id}
                        value={String(option.id)}
                        checked={isSelected}
                        onChange={() => selectOption(question, option.id)}
                        className={cn(
                          answered &&
                            isCorrectOption &&
                            "border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                          answered &&
                            isSelected &&
                            !isCorrectOption &&
                            "border-destructive/60 bg-destructive/10 text-destructive",
                          answered &&
                            !isSelected &&
                            !isCorrectOption &&
                            "opacity-50",
                        )}
                      >
                        {option.word}
                      </QuestionnaireChoice>
                    );
                  })}
                </QuestionnaireChoices>
              </QuestionnaireItem>
            );
          })}

          <ContinueButton
            size="lg"
            disabled={!hasAnswered}
            className="mx-auto w-full max-w-xl cursor-pointer"
          >
            Continue
          </ContinueButton>
        </Questionnaire>
      </main>
    </PracticeContainer>
  );
};
