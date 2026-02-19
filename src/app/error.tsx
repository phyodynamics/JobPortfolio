"use client";

import { useEffect } from "react";
import Loader from "@/components/ui/loader";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <Loader
        title="Something went wrong"
        subtitle="An unexpected error occurred"
        size="md"
      />
      <button
        onClick={reset}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
      >
        Try Again
      </button>
    </div>
  );
}
