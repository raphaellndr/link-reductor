"use client";

import { useState } from "react";

import { shortenUrl } from "@/lib/api";
import { isValidUrl } from "@/lib/utils";
import type { UrlResponse } from "@/types";

import { InputField } from "./input-field";

interface UrlFormProps {
  onSuccess: (result: UrlResponse) => void;
}

export function UrlForm({ onSuccess }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);

    try {
      const result = await shortenUrl({ url, slug });
      onSuccess(result);
      setUrl("");
      setSlug("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col gap-4">
        <InputField
          id="url"
          type="url"
          label="Enter your long URL"
          value={url}
          onChange={setUrl}
          placeholder="https://example.com/very/long/url"
          disabled={isLoading}
        />

        <InputField
          id="slug"
          label="Custom slug (optional)"
          value={slug}
          onChange={setSlug}
          placeholder="my-custom-link"
          maxLength={30}
          disabled={isLoading}
          helperText="Leave empty for auto-generated link. Only letters, numbers, hyphens, and underscores."
        />

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isLoading ? "Shortening..." : "Shorten"}
        </button>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
