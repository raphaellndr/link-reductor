import { useState } from "react";

import { shortenUrl } from "@/lib/api";
import { isValidUrl } from "@/lib/utils";
import { UrlResponse } from "@/types";

interface UseUrlFormProps {
  onSuccess: (result: UrlResponse) => void;
}

export function useURLForm({ onSuccess }: UseUrlFormProps) {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return false;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      return false;
    }

    return true;
  };

  const clearError = () => setError("");

  const resetForm = () => {
    setUrl("");
    setSlug("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await shortenUrl({ url, slug: slug.trim() || undefined });
      onSuccess(result);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (error) clearError();
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);
    if (error) clearError();
  };

  return {
    url,
    slug,
    error,
    isLoading,
    handleUrlChange,
    handleSlugChange,
    handleSubmit,
  };
}
