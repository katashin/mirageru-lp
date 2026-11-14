export function Toc({ headings }: { headings: { id: string; text: string }[] }) {
  if (!headings.length) return null;
  return (
    <nav aria-label="目次" className="rounded-xl border border-[#e2e8f0] p-5">
      <p className="mb-2 text-sm font-bold text-[#0F172A]">目次</p>
      <ol className="flex list-decimal flex-col gap-1 pl-5 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="text-[#0e7c8c] underline-offset-2 hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
