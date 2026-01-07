"use client";

import { useState } from "react";

import { shortenUrl } from "@/lib/api";
import { isValidUrl } from "@/lib/utils";
import type { UrlResponse } from "@/types";

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
        <div className="flex flex-col gap-2">
          <label htmlFor="url" className="text-sm font-medium text-gray-700">
            Enter your long URL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="slug" className="text-sm font-medium text-gray-700">
            Custom slug (optional)
          </label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="my-custom-link"
            maxLength={30}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500">
            Leave empty for auto-generated link. Only letters, numbers, hyphens, and underscores.
          </p>
        </div>

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
