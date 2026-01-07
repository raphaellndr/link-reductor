import type { CreateUrlRequest, UrlResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Creates a shortened URL.
 */
export async function shortenUrl(url: string): Promise<UrlResponse> {
  const response = await fetch(`${API_URL}/api/urls/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url } as CreateUrlRequest),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.url?.[0] || "Failed to shorten URL");
  }

  return response.json();
}
