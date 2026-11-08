import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TripDescriptionProps {
  description: string;
}

export function TripDescription({ description }: TripDescriptionProps) {
  return (
    <div className="mb-8">
      <div className="prose prose-gray max-w-none text-[#4B5563]">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {description}
        </ReactMarkdown>
      </div>
    </div>
  );
}
