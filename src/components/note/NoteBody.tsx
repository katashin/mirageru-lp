import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import { extractHeadings } from "@/lib/note";

function textOf(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textOf).join("");
  return "";
}

export function NoteBody({ body }: { body: string }) {
  const ids = new Map(extractHeadings(body).map((h) => [h.text, h.id]));
  return (
    <div className="note-body flex flex-col gap-5 text-[16px] leading-[1.95] text-[#0F172A]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2
              id={ids.get(textOf(children).trim())}
              className="mt-6 scroll-mt-24 border-b-2 border-[#e3f4f6] pb-2 text-xl font-black"
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => <h3 className="mt-2 text-lg font-bold">{children}</h3>,
          ol: ({ children }) => <ol className="flex list-decimal flex-col gap-1.5 pl-6">{children}</ol>,
          ul: ({ children }) => <ul className="flex list-disc flex-col gap-1.5 pl-6">{children}</ul>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#169db2] pl-4 text-[#475569]">{children}</blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b-2 border-[#169db2] bg-[#e3f4f6] px-3 py-2 text-left font-bold">{children}</th>
          ),
          td: ({ children }) => <td className="border-b border-[#e2e8f0] px-3 py-2 align-top">{children}</td>,
          a: ({ href, children }) => (
            <a href={href} className="text-[#0e7c8c] underline underline-offset-2">
              {children}
            </a>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
