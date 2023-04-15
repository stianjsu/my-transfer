"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 m-auto">
      <h1>Something went wrong!</h1>
      <span>{error.message}</span>
      <button
        onClick={() => reset()}
        className="h-8 bg-slate-900 rounded-md m-auto w-28 hover:font-bold"
      >
        Try again
      </button>
    </main>
  );
}
