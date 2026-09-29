import { useAiCheck } from "../useAiCheckWord";
import { aiPosCheck } from "@/lib/api/aiPosCheck.api";
import type { PosCheckRequest, PosItem } from "./schema";

export type PosCheckState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "valid"; pos: string; meaning: string }
  | { status: "invalidPos" }
  | { status: "multiplePos"; availablePos: PosItem[] };

type PosResultState = Exclude<PosCheckState, { status: "idle" | "loading" }>;

export function usePosCheck() {
  const { state, check, reset } = useAiCheck(
    aiPosCheck,
    (res, req): PosResultState => {
      const first = res.availablePos[0];

      if (req.partOfSpeech) {
        return res.isValid
          ? {
              status: "valid",
              pos: req.partOfSpeech,
              meaning: first?.meaning ?? "",
            }
          : { status: "invalidPos" };
      }

      return res.isValid
        ? {
            status: "valid",
            pos: first?.pos ?? "",
            meaning: first?.meaning ?? "",
          }
        : { status: "multiplePos", availablePos: res.availablePos };
    },
  );

  const checkPos = (req: PosCheckRequest, signal?: AbortSignal) =>
    check(req, signal);

  return { state: state as PosCheckState, checkPos, reset };
}
