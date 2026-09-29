import { API_ROUTES } from "@/constants/routes";
import { callAi } from "./callAi";
import {
  WordDetailsRequest,
  WordDetailsResponse,
} from "@/features/word/form/ai/word-details/schema";

export const aiWordDetails = async (
  payload: WordDetailsRequest,
  signal?: AbortSignal,
): Promise<WordDetailsResponse> =>
  callAi<WordDetailsRequest, WordDetailsResponse>({
    url: API_ROUTES.ai_WORD_DETAILS,
    payload,
    signal,
  });
