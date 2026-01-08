"use client";

import { useURLForm } from "@/hooks/use-url-form";
import type { UrlResponse } from "@/types";

import { InputField } from "./input-field";

interface UrlFormProps {
  onSuccess: (result: UrlResponse) => void;
}

export function UrlForm({ onSuccess }: UrlFormProps) {
  const { url, slug, error, isLoading, handleUrlChange, handleSlugChange, handleSubmit } =
    useURLForm({ onSuccess });

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
      <InputField
        id="url"
        type="url"
        label="Enter your long URL"
        value={url}
        onChange={handleUrlChange}
        placeholder="https://example.com/very/long/url"
        disabled={isLoading}
      />

      <InputField
        id="slug"
        label="Custom slug (optional)"
        value={slug}
        onChange={handleSlugChange}
        placeholder="my-custom-link"
        maxLength={30}
        disabled={isLoading}
        helperText="Leave empty for auto-generated link. Only letters, numbers, hyphens, and underscores."
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isLoading ? "Shortening..." : "Shorten"}
      </button>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
