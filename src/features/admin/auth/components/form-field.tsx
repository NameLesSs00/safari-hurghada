export function FormField({
  autoComplete,
  error,
  label,
  name,
  onChange,
  placeholder,
  required = true,
  type = "text",
  value,
}: {
  autoComplete?: string;
  error?: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
        {label}
      </span>
      <input
        autoComplete={autoComplete}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#1E232A] outline-none transition-all placeholder:text-slate-400 focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20"
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {error ? (
        <span className="mt-1.5 block text-xs font-semibold text-rose-600">{error}</span>
      ) : null}
    </label>
  );
}
