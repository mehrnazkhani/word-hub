export function aiErrorResponse(err: any, context: string) {
  console.error(`[${context}] failed:`, err);

  if (err.name === "AbortError" || err.name === "TimeoutError") {
    return Response.json(
      { error: "Request timed out. Please try again." },
      { status: 408 },
    );
  }

  const status = err.statusCode ?? err.status;

  if (status === 429) {
    return Response.json(
      { error: "AI rate limit reached. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  if (status === 401) {
    return Response.json({ error: "Invalid API key." }, { status: 401 });
  }

  if (err.cause?.code === "ECONNREFUSED" || err.cause?.code === "ENOTFOUND") {
    return Response.json(
      { error: "Could not reach AI provider." },
      { status: 503 },
    );
  }

  return Response.json(
    { error: "Something went wrong. Please try again." },
    { status: 500 },
  );
}
