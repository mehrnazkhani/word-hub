"use client";

import { useState } from "react";

export function useAiCheck<TReq, TRes, TState extends { status: string }>(
  call: (req: TReq, signal?: AbortSignal) => Promise<TRes>,
  toState: (res: TRes, req: TReq) => TState,
) {
  type State = { status: "idle" } | { status: "loading" } | TState;
  const [state, setState] = useState<State>({ status: "idle" });

  const check = async (req: TReq, signal?: AbortSignal) => {
    setState({ status: "loading" });
    try {
      const res = await call(req, signal);
      setState(toState(res, req));
      return res;
    } catch (err) {
      setState({ status: "idle" });
      throw err;
    }
  };

  const reset = () => setState({ status: "idle" });

  return { state, check, reset };
}
