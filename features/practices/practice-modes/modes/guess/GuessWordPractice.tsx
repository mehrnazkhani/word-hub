"use client";

import { useMemo } from "react";

import { getTextDirection } from "@/lib/utils/getTextDirection";
import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireProgress,
  QuestionnaireSubmit,
} from "@/components/ui/questionnaire";
import { MIN_WORDS_REQUIRED } from "@/constants/practice-modes";

import { PracticeChoices } from "../../PracticeChoices";
import { PracticeComplete } from "../../PracticeComplete";
import { PracticeContainer } from "../../PracticeContainer";
import { PracticeEmptyState } from "../../PracticeEmptyState";
import { PracticeLoading } from "../../PracticeLoading";
import { getAnswerResults, usePracticeAnswers } from "../../usePracticeAnswers";
import { getPracticeItemId, usePracticeFlow } from "../../usePracticeFlow";
import { useGuessQuestions } from "./useGuessQuestions";

import type { CategoryId } from "../../PracticeCategoryList";
import type { PracticeModeWords } from "../../validatePracticeMode";
import type { PracticeModeName } from "@/constants/practice-modes";

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
  } = usePracticeAnswers(questions ?? []);
  const results = useMemo(
    () => getAnswerResults(questions, answers),
    [answers, questions],
  );

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

  if (!questions) return <PracticeLoading />;

  if (questions.length === 0) {
    return (
      <PracticeEmptyState
        description={`Guess Meaning needs at least ${MIN_WORDS_REQUIRED} words with descriptions.`}
      />
    );
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

  const selectedOptionId = answers[currentQuestion.id] ?? null;
  const hasAnswered = selectedOptionId !== null;
  const ContinueButton = isLastQuestion
    ? QuestionnaireSubmit
    : QuestionnaireNext;

  return (
    <PracticeContainer current={currentIndex} total={questions.length}>
      <main className="flex flex-1 flex-col justify-center pb-[clamp(24px,6vh,64px)]">
        <Questionnaire
          item={getPracticeItemId(practiceMode, currentQuestion.id)}
          onItemChange={navigateToItem}
          className="gap-16"
          onSubmit={(event) => {
            event.preventDefault();
            if (!isLastQuestion) return;

            goToNextQuestion();
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
                name={getPracticeItemId(practiceMode, question.id)}
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

                <PracticeChoices
                  options={question.options.map((option) => ({
                    value: String(option.id),
                    label: option.word,
                    onSelect: () => selectOption(question, option.id),
                  }))}
                  selected={selected !== null ? [String(selected)] : []}
                  correct={[String(question.correctOptionId)]}
                  revealed={answered}
                />
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
