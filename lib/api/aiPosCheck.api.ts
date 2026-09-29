import { callAi } from "./callAi";
import { API_ROUTES } from "@/constants/routes";
import {
  PosCheckRequest,
  PosCheckResponse,
} from "@/features/word/form/ai/POS-check/schema";

export const aiPosCheck = (payload: PosCheckRequest, signal?: AbortSignal) =>
  callAi<PosCheckRequest, PosCheckResponse>({
    url: API_ROUTES.ai_POS_CHECK,
    payload,
    signal,
  });
