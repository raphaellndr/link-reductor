"use client";

import { useState } from "react";

import { UrlForm } from "@/components/url-form";
import { UrlResult } from "@/components/url-result";
import type { UrlResponse } from "@/types";

export default function Home() {
  const [result, setResult] = useState<UrlResponse | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex w-full max-w-4xl flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">URL Shortener</h1>
          <p className="mt-2 text-gray-600">Transform long URLs into short, shareable links</p>
        </div>

        <UrlForm onSuccess={setResult} />

        {result && <UrlResult result={result} />}
      </div>
    </main>
  );
}
