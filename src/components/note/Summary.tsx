export function Summary({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="rounded-xl bg-[#e3f4f6] p-5">
      <p className="mb-3 text-xs font-bold tracking-widest text-[#0e7c8c]">この記事の要点</p>
      <ol className="flex flex-col gap-2">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3 text-[15px] font-medium text-[#0F172A]">
            <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-[#0e7c8c] text-xs font-bold text-white">
              {i + 1}
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
