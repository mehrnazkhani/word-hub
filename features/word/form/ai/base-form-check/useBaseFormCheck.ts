import { useAiCheck } from "../useAiCheckWord";
import { aiBaseFormCheck } from "@/lib/api/aiBaseFormCheck.api";
import type { BaseFormCheckRequest } from "./schema";

export type BaseFormCheckState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "isBaseForm" }
  | { status: "notBaseForm"; formDescription: string; baseForm: string };

type BaseFormResultState = Extract<
  BaseFormCheckState,
  { status: "isBaseForm" | "notBaseForm" }
>;

export function useBaseFormCheck() {
  const { state, check, reset } = useAiCheck(
    aiBaseFormCheck,
    (res, req): BaseFormResultState =>
      res.isBaseForm
        ? { status: "isBaseForm" }
        : {
            status: "notBaseForm",
            formDescription: res.formDescription,
            baseForm: res.baseForm || req.word,
          },
  );

  const checkBaseForm = (req: BaseFormCheckRequest, signal?: AbortSignal) =>
    check(req, signal);

  return { state: state as BaseFormCheckState, checkBaseForm, reset };
}
