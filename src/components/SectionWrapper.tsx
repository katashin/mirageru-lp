interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, className = "", children }: SectionWrapperProps) {
  return (
    <section id={id} className={`w-full py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl px-6 md:px-8">{children}</div>
    </section>
  );
}
