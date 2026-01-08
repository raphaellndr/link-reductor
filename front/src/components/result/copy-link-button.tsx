import { SetStateAction, useEffect } from "react";

import { copyToClipboard } from "@/lib/utils";

interface CopyLinkButtonProps {
  textToCopy: string;
  hasCopied: boolean;
  setHasCopied: React.Dispatch<SetStateAction<boolean>>;
}

export function CopyLinkButton({ textToCopy, hasCopied, setHasCopied }: CopyLinkButtonProps) {
  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const handleCopy = async () => {
    try {
      await copyToClipboard(textToCopy);
      setHasCopied(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <button
      onClick={handleCopy}
      className={`rounded-lg px-4 py-2 text-sm font-medium ${
        hasCopied ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {hasCopied ? "Copied!" : "Copy"}
    </button>
  );
}
