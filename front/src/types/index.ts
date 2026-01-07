/**
 * Response from URL creation endpoint.
 */
export interface UrlResponse {
  id: string;
  url: string;
  slug: string;
}

/**
 * Request body for creating a shortened URL.
 */
export interface ShortenUrlRequest {
  url: string;
  slug?: string;
}
