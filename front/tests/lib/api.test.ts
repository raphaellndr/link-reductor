import { beforeEach, describe, expect, it, vi } from "vitest";

import { shortenUrl } from "@/lib/api";

global.fetch = vi.fn();

describe("shortenUrl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns shortened URL on success", async () => {
    const mockResponse = { id: "uuid", url: "https://example.com" };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await shortenUrl("https://example.com");

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
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ url: ["Invalid URL"] }),
    });

    await expect(shortenUrl("invalid")).rejects.toThrow("Invalid URL");
  });
});
