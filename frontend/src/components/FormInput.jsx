import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function FormInput({
  label,
  icon: Icon,
  type = "text",
  isPassword = false,
  ...props
}) {
  const [visible, setVisible] = useState(false);
  const inputType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-[11px] font-medium text-ink-400">
          {label}
        </span>
      )}
      <span className="flex items-center gap-2.5 rounded-xl border border-ink-200 bg-white px-4 py-3 transition-colors focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
        {Icon && (
          <Icon
            className="h-[18px] w-[18px] shrink-0 text-ink-400"
            strokeWidth={1.8}
          />
        )}
        <input
          type={inputType}
          className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="shrink-0 text-ink-400 hover:text-ink-600"
            tabIndex={-1}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? (
              <EyeOff className="h-[18px] w-[18px]" strokeWidth={1.8} />
            ) : (
              <Eye className="h-[18px] w-[18px]" strokeWidth={1.8} />
            )}
          </button>
        )}
      </span>
    </label>
  );
}
