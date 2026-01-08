"use client";

import { useState } from "react";

import type { UrlResponse } from "@/types";

import { CopyLinkButton } from "./copy-link-button";
import { ShareURLButton } from "./share-url-button";
import { ShowButton } from "./show-button";

interface UrlResultProps {
  result: UrlResponse;
}

export function UrlResult({ result }: UrlResultProps) {
  const [copied, setCopied] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Construct URL based on whether slug exists
  const shortUrl = result.slug
    ? `${API_URL}/api/urls/s/${result.slug}/`
    : `${API_URL}/api/urls/u/${result.id}/`;

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
          <CopyLinkButton textToCopy={shortUrl} hasCopied={copied} setHasCopied={setCopied} />
          <ShareURLButton url={shortUrl} />
        </div>
        <ShowButton text="original URL" show={showOriginal} setShow={setShowOriginal} />
        {showOriginal && <p className="text-sm break-all text-gray-500">{result.url}</p>}
      </div>
    </div>
  );
}
