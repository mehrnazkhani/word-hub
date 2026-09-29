"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowButton } from "@/components/ArrowButton";
import { AiFillButton } from "./ai/AiFillButton";
import { AiWordFormTab } from "./AiWordFormTab";
import { ManualTab } from "./ManualTab";

import { useAiFillWord } from "@/features/word/form/ai/useAiFillWord";
import { useCreateWordMutation } from "@/queries/words/create/useCreateWord.mutation";
import { useUserSettings } from "@/queries/user-settings/useUserSettings";
import { useWordCount } from "@/queries/words/count/useWordCount";
import { APP_LIMITS } from "@/constants/app-limits";

import {
  addWordFormSchema,
  type AddWordFormValues,
} from "@/schemas/word/word.schema";
import type { aiFillWord } from "@/lib/api/aiFill.api";

type AiResult = Awaited<ReturnType<typeof aiFillWord>>;

const addWordFormDefaultValues: AddWordFormValues = {
  word: "",
  translation: "",
  sourceLanguageId: "",
  targetLanguageId: "",
  partOfSpeech: null,
  categoryId: null,
  synonyms: "",
  antonyms: "",
  description: "",
  example: "",
};

const AddWordForm = () => {
  const { data: userSettings } = useUserSettings();
  const [activeTab, setActiveTab] = useState<"ai" | "manual">("ai");
  const [aiResult, setAiResult] = useState<AiResult | null>(null);

  const methods = useForm<AddWordFormValues>({
    resolver: zodResolver(addWordFormSchema),
    defaultValues: {
      ...addWordFormDefaultValues,
      sourceLanguageId: userSettings?.default_source_lang_id
        ? String(userSettings.default_source_lang_id)
        : "",
      targetLanguageId: userSettings?.default_target_lang_id
        ? String(userSettings.default_target_lang_id)
        : "",
      categoryId: userSettings?.default_category_id
        ? String(userSettings.default_category_id)
        : null,
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isDirty },
  } = methods;

  const {
    fillWithAI,
    isLoading: isAiLoading,
    validationState,
    confirmWord,
    confirmPos,
    continueAnyway,
    dismissValidation,
    stopAI,
  } = useAiFillWord(methods);

  const { data: wordsCount } = useWordCount();
  const { mutateAsync: creteWord } = useCreateWordMutation();

  const handleFillWithAI = async () => {
    setAiResult(null);
    const result = await fillWithAI();
    if (result) setAiResult(result);
  };

  const handleConfirmWord = async (word: string) => {
    setAiResult(null);
    const result = await confirmWord(word);
    if (result) setAiResult(result);
  };

  const handleConfirmPos = async (pos: string) => {
    setAiResult(null);
    const result = await confirmPos(pos);
    if (result) setAiResult(result);
  };

  const handleContinueAnyway = async () => {
    setAiResult(null);
    const result = await continueAnyway();
    if (result) setAiResult(result);
  };

  const onSubmit = async (data: AddWordFormValues) => {
    if ((wordsCount ?? 0) >= APP_LIMITS.word_limit_per_user) {
      toast.error(
        `You've reached the maximum limit of ${APP_LIMITS.word_limit_per_user} words.`,
      );
      return;
    }

    try {
      await creteWord(
        { ...data, source: "manual" },
        {
          onSuccess: () => {
            reset();
            setAiResult(null);
          },
        },
      );
    } catch {}
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col gap-4"
      >
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "ai" | "manual")}
        >
          <TabsList className="w-full">
            <TabsTrigger value="ai" className="flex-1 cursor-pointer gap-1.5">
              Fill with AI
            </TabsTrigger>
            <TabsTrigger
              value="manual"
              className="flex-1 cursor-pointer gap-1.5"
            >
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="mt-4">
            <AiWordFormTab
              methods={methods}
              isAiLoading={isAiLoading}
              aiResult={aiResult}
              validationState={validationState}
              onConfirmWord={handleConfirmWord}
              onConfirmPos={handleConfirmPos}
              onContinueAnyway={handleContinueAnyway}
              onDismissValidation={dismissValidation}
            />
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <ManualTab control={control} />
          </TabsContent>
        </Tabs>

        <div className="flex-1" />

        <div className="flex justify-between">
          {activeTab === "ai" ? (
            <AiFillButton
              isLoading={isAiLoading}
              onFill={handleFillWithAI}
              onStop={stopAI}
            />
          ) : (
            <div />
          )}

          <ArrowButton
            type="submit"
            isDirty={isDirty}
            isLoading={isSubmitting}
            disabled={!isDirty}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </ArrowButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddWordForm;
