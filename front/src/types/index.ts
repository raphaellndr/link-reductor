/**
 * Response from URL creation endpoint.
 */
export interface UrlResponse {
  id: string;
  url: string;
}

/**
 * Request body for creating a shortened URL.
 */
export interface CreateUrlRequest {
  url: string;
}
