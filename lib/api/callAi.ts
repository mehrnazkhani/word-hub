type CallAiOptions<TIn> = {
  url: string;
  payload: TIn;
  signal?: AbortSignal;
};

export const callAi = async <TIn, TOut>({
  url,
  payload,
  signal,
}: CallAiOptions<TIn>): Promise<TOut> => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "AI request failed");
  return data as TOut;
};
