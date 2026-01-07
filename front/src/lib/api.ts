import type { ShortenUrlRequest, UrlResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Creates a shortened URL.
 */
export async function shortenUrl({ url, slug }: ShortenUrlRequest): Promise<UrlResponse> {
  const response = await fetch(`${API_URL}/api/urls/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, slug } as ShortenUrlRequest),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.url?.[0] || error.slug?.[0] || "Failed to shorten URL");
  }

  return response.json();
}
