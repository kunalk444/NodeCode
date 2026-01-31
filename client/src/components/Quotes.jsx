function Quotes() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(251,146,60,0.25)] transition-shadow space-y-8">

      <blockquote className="relative text-gray-700 italic text-sm leading-relaxed">
        <span className="absolute -left-3 -top-3 text-4xl text-rose-400 font-serif">“</span>
        The most important skill for a programmer is the ability to effectively
        reason about problems.
        <span className="absolute -right-2 bottom-0 text-4xl text-orange-400 font-serif">”</span>
        <div className="mt-2 text-xs not-italic text-gray-500 font-semibold">
          — Brian Kernighan
        </div>
      </blockquote>

      <blockquote className="relative text-gray-700 italic text-sm leading-relaxed">
        <span className="absolute -left-3 -top-3 text-4xl text-rose-400 font-serif">“</span>
        Simplicity is prerequisite for reliability.
        <span className="absolute -right-2 bottom-0 text-4xl text-orange-400 font-serif">”</span>
        <div className="mt-2 text-xs not-italic text-gray-500 font-semibold">
          — Edsger W. Dijkstra
        </div>
      </blockquote>

    </div>
  );
}

export default Quotes;
