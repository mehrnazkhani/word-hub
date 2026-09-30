"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiFillButton } from "./ai/AiFillButton";
import { AiWordFormTab } from "./AiWordFormTab";
import { ManualTab } from "./ManualTab";
import { FormFooter } from "@/components/FormFooter";

import { useWordDetails } from "./ai/word-details/useWordDetails";
import { useCreateWordMutation } from "@/queries/words/create/useCreateWord.mutation";
import { useUserSettings } from "@/queries/user-settings/useUserSettings";
import { useWordCount } from "@/queries/words/count/useWordCount";
import { APP_LIMITS } from "@/constants/app-limits";

import {
  addWordFormSchema,
  type AddWordFormValues,
} from "@/schemas/word/word.schema";
import type { aiWordDetails } from "@/lib/api/aiWordDetails.api";
import { LoadingButton } from "@/components/LoadingButton";

type AiResult = Awaited<ReturnType<typeof aiWordDetails>>;

const FORM_ID = "add-word-form";

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
    wordDetails,
    isLoading: isAiLoading,
    validationState,
    confirmWord,
    confirmPos,
    continueAnyway,
    dismissValidation,
    stopAI,
  } = useWordDetails(methods);

  const { data: wordsCount } = useWordCount();
  const { mutateAsync: createWord } = useCreateWordMutation();

  const handleFillWithAI = async () => {
    setAiResult(null);
    const result = await wordDetails();
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
      await createWord(
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
      <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)}>
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
      </form>

      <FormFooter>
        <div
          className={cn(
            "grid gap-3 md:flex md:justify-between",
            activeTab === "ai" ? "grid-cols-2" : "grid-cols-1",
          )}
        >
          {activeTab === "ai" && (
            <AiFillButton
              className="w-full md:w-auto"
              isLoading={isAiLoading}
              onFill={handleFillWithAI}
              onStop={stopAI}
            />
          )}

          <LoadingButton
            className={cn(
              "w-full md:w-auto",
              activeTab === "manual" && "md:ml-auto",
            )}
            type="submit"
            form={FORM_ID}
            isLoading={isSubmitting}
            disabled={!isDirty}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </LoadingButton>
        </div>
      </FormFooter>
    </FormProvider>
  );
};

export default AddWordForm;
