import { useRef, useState, type JSX } from "react";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: JSX.Element;
  props: {
    [x: string]: any;
  };
}

export default function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyCode = () => {
    if (!preRef.current) return;
    navigator.clipboard.writeText(preRef.current.textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="relative group">
      <button
        onClick={copyCode}
        className={cn(
          "absolute top-2 right-2 p-1.5 text-sm bg-gray-700 text-off-w rounded cursor-pointer opacity-0",
          "group-hover:opacity-100 transition-all duration-100"
        )}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={copied ? "copy-check" : "copy"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.05 }}
          >
            {copied ? (
              <CopyCheckIcon className="size-4" />
            ) : (
              <CopyIcon className="size-4" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>

      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
