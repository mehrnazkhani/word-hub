import { API_ROUTES } from "@/constants/routes";
import { callAi } from "./callAi";
import {
  SpellingCheckRequest,
  SpellingCheckResponse,
} from "@/features/word/form/ai/spelling-check/schema";

export const aiSpellingCheck = async (
  payload: SpellingCheckRequest,
  signal?: AbortSignal,
): Promise<SpellingCheckResponse> =>
  callAi<SpellingCheckRequest, SpellingCheckResponse>({
    url: API_ROUTES.ai_SPELLING_CHECK,
    payload,
    signal,
  });
