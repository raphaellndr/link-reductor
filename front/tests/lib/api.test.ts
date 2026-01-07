import { beforeEach, describe, expect, it, vi } from "vitest";

import { shortenUrl } from "@/lib/api";

global.fetch = vi.fn();

const mockFetch = global.fetch as ReturnType<typeof vi.fn>;

describe("shortenUrl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns shortened URL on success", async () => {
    const mockResponse = { id: "uuid", url: "https://example.com" };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await shortenUrl({url: "https://example.com"});

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/urls/",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ url: "https://example.com" }),
      }),
    );
  });

  it("throws error on API failure", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ url: ["Invalid URL"] }),
    } as Response);

    await expect(shortenUrl({url: "invalid"})).rejects.toThrow("Invalid URL");
  });
});
