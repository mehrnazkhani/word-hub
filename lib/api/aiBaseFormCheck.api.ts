import { callAi } from "./callAi";
import { API_ROUTES } from "@/constants/routes";
import {
  BaseFormCheckRequest,
  BaseFormCheckResponse,
} from "@/features/word/form/ai/base-form-check/schema";

export const aiBaseFormCheck = async (
  payload: BaseFormCheckRequest,
  signal?: AbortSignal,
) =>
  callAi<BaseFormCheckRequest, BaseFormCheckResponse>({
    url: API_ROUTES.ai_BASE_FORM_CHECK,
    payload,
    signal,
  });
