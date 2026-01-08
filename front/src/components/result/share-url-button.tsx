interface ShareURLButtonProps {
  url: string;
}

export function ShareURLButton({ url }: ShareURLButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shortened URL",
          text: "Check out this link:",
          url: url,
        });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          shareViaEmail();
        }
      }
    } else {
      shareViaEmail();
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent("Shortened URL");
    const body = encodeURIComponent(`Check out this link: ${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <button
      onClick={handleShare}
      className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
    >
      Share
    </button>
  );
}
