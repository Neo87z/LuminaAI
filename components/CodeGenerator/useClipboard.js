import { useState } from "react";

const useClipboard = (contentRefs) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => setIsCopied(true))
      .catch((error) => console.error("Error copying to clipboard:", error));
  };

  const handleCopy = (contentRef) => {
    const content = contentRef.current.innerText;
    copyToClipboard(content);
    setTimeout(() => setIsCopied(false), 3000); // Reset isCopied after 3 seconds
  };

  return { isCopied, handleCopy };
};

export default useClipboard;
