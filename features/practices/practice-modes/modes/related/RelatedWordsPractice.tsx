"use client";

import { useEffect, useRef } from "react";

import { getTextDirection } from "@/lib/utils/getTextDirection";
import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireProgress,
  QuestionnaireSubmit,
} from "@/components/ui/questionnaire";
import {
  MIN_WORDS_REQUIRED,
  type PracticeModeName,
} from "@/constants/practice-modes";

import { PracticeChoices } from "../../PracticeChoices";
import { PracticeComplete } from "../../PracticeComplete";
import { PracticeContainer } from "../../PracticeContainer";
import { PracticeEmptyState } from "../../PracticeEmptyState";
import { PracticeLoading } from "../../PracticeLoading";
import { getPracticeItemId, usePracticeFlow } from "../../usePracticeFlow";
import { useRelatedPractice } from "./useRelatedPractice";
import { useRelatedQuestions } from "./useRelatedQuestions";

import type { CategoryId } from "../../PracticeCategoryList";
import type { PracticeModeWords } from "../../validatePracticeMode";
import type { RelatedField } from "./types";

// How long the revealed answers stay visible before the next question.
const ADVANCE_DELAY_MS = 1200;

type RelatedWordsPracticeProps = {
  categoryId: CategoryId;
  words: PracticeModeWords;
  practiceMode: PracticeModeName;
};

const RELATED_COPY: Record<
  RelatedField,
  { instruction: string; emptyDescription: string }
> = {
  synonyms: {
    instruction: "Select all synonyms of the word.",
    emptyDescription: `Synonyms needs at least ${MIN_WORDS_REQUIRED} words with synonyms.`,
  },
  antonyms: {
    instruction: "Select all antonyms of the word.",
    emptyDescription: `Antonyms needs at least ${MIN_WORDS_REQUIRED} words with antonyms.`,
  },
};

/** The synonym and antonym modes only differ by the word field they use. */
const toRelatedField = (practiceMode: PracticeModeName): RelatedField =>
  practiceMode === "antonym" ? "antonyms" : "synonyms";

export const RelatedWordsPractice = ({
  categoryId,
  words,
  practiceMode,
}: RelatedWordsPracticeProps) => {
  const field = toRelatedField(practiceMode);
  const copy = RELATED_COPY[field];

  const questions = useRelatedQuestions(words, field);
  const {
    selections,
    revealed,
    results,
    isCompleted,
    correctCount,
    incorrectCount,
    pickOption,
    reveal,
    complete,
  } = useRelatedPractice(questions ?? []);

  const {
    currentIndex,
    currentQuestion,
    isLastQuestion,
    navigateToItem,
    goToNextQuestion,
    showResults,
    setShowResults,
    elapsedSeconds,
  } = usePracticeFlow({
    questions,
    results,
    words,
    categoryId,
    practiceMode,
    correctCount,
    incorrectCount,
    isCompleted,
    onComplete: complete,
  });

  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Never leave a pending reveal timer behind.
  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current !== null) {
        clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, []);

  // Moving to another question (e.g. clicking Continue again) cancels the
  // pending reveal timer so the practice cannot skip a question.
  useEffect(() => {
    if (advanceTimeoutRef.current === null) return;

    clearTimeout(advanceTimeoutRef.current);
    advanceTimeoutRef.current = null;
  }, [currentIndex]);

  const handleItemChange = (item: string) => {
    // Leaving an unrevealed question settles it as-is, so the
    // questionnaire's own navigation never skips scoring.
    if (currentQuestion) reveal(currentQuestion);

    navigateToItem(item);
  };

  if (!questions) return <PracticeLoading />;

  if (questions.length === 0) {
    return <PracticeEmptyState description={copy.emptyDescription} />;
  }

  if (!currentQuestion) {
    return (
      <PracticeComplete
        open={showResults}
        onOpenChange={setShowResults}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        elapsedSeconds={elapsedSeconds}
        totalWords={questions.length}
      />
    );
  }

  const selected = selections[currentQuestion.id] ?? [];
  const isRevealed = revealed[currentQuestion.id] !== undefined;

  const ContinueButton = isLastQuestion
    ? QuestionnaireSubmit
    : QuestionnaireNext;

  const revealAndAdvance = () => {
    reveal(currentQuestion);

    // A second click right after the first one must not schedule twice.
    if (advanceTimeoutRef.current !== null) return;

    advanceTimeoutRef.current = setTimeout(() => {
      advanceTimeoutRef.current = null;
      goToNextQuestion();
    }, ADVANCE_DELAY_MS);
  };

  return (
    <PracticeContainer current={currentIndex} total={questions.length}>
      <main className="flex flex-1 flex-col justify-center pb-[clamp(24px,6vh,64px)]">
        <Questionnaire
          item={getPracticeItemId(practiceMode, currentQuestion.id)}
          onItemChange={handleItemChange}
          className="gap-16"
          onSubmit={(event) => {
            event.preventDefault();

            // Reached before the answer was revealed (e.g. Ctrl+Enter).
            if (!isRevealed) {
              revealAndAdvance();
              return;
            }

            if (!isLastQuestion) return;

            goToNextQuestion();
          }}
        >
          <div className="mx-auto w-full max-w-xl space-y-1 text-start">
            <QuestionnaireProgress />
            <p className="text-sm text-muted-foreground">{copy.instruction}</p>
          </div>

          {questions.map((question) => {
            const questionSelected = selections[question.id] ?? [];
            const isQuestionRevealed = revealed[question.id] !== undefined;
            const direction = getTextDirection(question.word);

            return (
              <QuestionnaireItem
                key={question.id}
                name={getPracticeItemId(practiceMode, question.id)}
                multiple
                required
                aria-labelledby={`${practiceMode}-word-${question.id}`}
                className="gap-16"
              >
                <p
                  id={`${practiceMode}-word-${question.id}`}
                  dir={direction}
                  lang={direction === "rtl" ? "fa" : undefined}
                  className="text-center font-heading text-lg leading-relaxed font-medium text-pretty sm:text-xl"
                >
                  {question.word}
                </p>

                <PracticeChoices
                  className="sm:grid-cols-2"
                  options={question.options.map((option) => ({
                    value: option,
                    label: option,
                    onSelect: () => pickOption(question, option),
                  }))}
                  selected={questionSelected}
                  correct={question.related}
                  revealed={isQuestionRevealed}
                />
              </QuestionnaireItem>
            );
          })}

          <ContinueButton
            size="lg"
            disabled={selected.length === 0}
            onClick={(event) => {
              // The first press reveals the answer, then continues.
              if (isRevealed) return;

              event.preventDefault();
              revealAndAdvance();
            }}
            className="mx-auto w-full max-w-xl cursor-pointer"
          >
            Continue
          </ContinueButton>
        </Questionnaire>
      </main>
    </PracticeContainer>
  );
};
