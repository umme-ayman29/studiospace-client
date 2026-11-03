export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <div className={`mb-12 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl font-bold md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 opacity-70">{subtitle}</p>}
    </div>
  );
}