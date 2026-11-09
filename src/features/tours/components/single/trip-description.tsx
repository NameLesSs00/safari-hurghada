import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Info } from "lucide-react";

interface TripDescriptionProps {
  description: string;
}

export function TripDescription({ description }: TripDescriptionProps) {
  if (!description) return null;

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#F36F21]">
          <Info size={18} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1E232A]">
          About This Experience
        </h2>
      </div>

      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed prose-headings:text-[#1E232A] prose-headings:font-bold prose-p:mb-4 prose-p:leading-relaxed prose-li:my-1 prose-strong:text-[#1E232A]">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {description}
        </ReactMarkdown>
      </div>
    </section>
  );
}
