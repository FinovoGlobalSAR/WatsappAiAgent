export default function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2.5">
      <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-ink-200 transition-colors peer-checked:bg-brand-600" />
        <span className="absolute left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
      </span>
      {label && <span className="text-sm text-ink-600">{label}</span>}
    </label>
  );
}
