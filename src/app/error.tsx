"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="m-auto flex min-h-screen flex-col items-center pt-24">
      <h1>Something went wrong!</h1>
      <span>{error.message}</span>
      <button
        onClick={() => reset()}
        className="m-auto h-8 w-28 rounded-md bg-slate-900 hover:font-bold"
      >
        Try again
      </button>
    </main>
  );
}
