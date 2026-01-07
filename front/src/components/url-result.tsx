"use client";

import { useEffect, useState } from "react";

import { copyToClipboard } from "@/lib/utils";
import type { UrlResponse } from "@/types";

interface UrlResultProps {
  result: UrlResponse;
}

export function UrlResult({ result }: UrlResultProps) {
  const [copied, setCopied] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Construct URL based on whether slug exists
  const shortUrl = result.slug
    ? `${API_URL}/api/urls/s/${result.slug}/`
    : `${API_URL}/api/urls/u/${result.id}/`;

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await copyToClipboard(shortUrl);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Your shortened URL</h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate text-blue-600 hover:underline"
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              copied ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-sm break-all text-gray-500">Original: {result.url}</p>
      </div>
    </div>
  );
}
