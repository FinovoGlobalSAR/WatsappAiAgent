const PROVIDERS = [
  {
    id: "google",
    label: "Google",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4">
        <path
          fill="#EA4335"
          d="M12 10.2v3.9h5.5c-.24 1.28-.97 2.36-2.06 3.09v2.57h3.33c1.95-1.8 3.07-4.44 3.07-7.57 0-.73-.07-1.43-.19-2.1H12z"
        />
        <path
          fill="#34A853"
          d="M12 21c2.7 0 4.97-.89 6.63-2.42l-3.33-2.57c-.92.62-2.1.98-3.3.98-2.54 0-4.69-1.71-5.46-4.02H3.1v2.65C4.76 18.98 8.13 21 12 21z"
        />
        <path
          fill="#4A90E2"
          d="M6.54 12.97a5.93 5.93 0 0 1 0-3.94V6.38H3.1a9 9 0 0 0 0 8.24l3.44-2.65z"
        />
        <path
          fill="#FBBC05"
          d="M12 6.98c1.47 0 2.79.5 3.83 1.49l2.87-2.87C16.96 3.9 14.7 3 12 3 8.13 3 4.76 5.02 3.1 8.24l3.44 2.65C7.31 8.58 9.46 6.98 12 6.98z"
        />
      </svg>
    ),
  },
  {
    id: "apple",
    label: "Apple",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M16.36 1.43c0 1.14-.42 2.2-1.25 3.06-.9.94-2.11 1.55-3.15 1.46-.12-1.1.42-2.24 1.24-3.09.87-.9 2.24-1.5 3.16-1.43zM20.7 17.2c-.5 1.14-.73 1.65-1.37 2.65-.9 1.4-2.16 3.14-3.72 3.15-1.38.02-1.74-.9-3.6-.89-1.87.01-2.27.9-3.66.88-1.56-.02-2.75-1.59-3.64-3-2.5-3.86-2.77-8.4-1.22-10.81 1.1-1.72 2.84-2.73 4.47-2.73 1.66 0 2.7.91 4.08.91 1.33 0 2.14-.91 4.07-.91 1.45 0 2.98.79 4.08 2.15-3.58 1.96-3 7.07 1.51 8.6z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4">
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path
          fill="#fff"
          d="M15.4 12.4h-2.1V19h-2.6v-6.6H9.2v-2.2h1.5V8.8c0-1.5.9-2.8 3.1-2.8h1.8v2.1h-1.3c-.5 0-.6.3-.6.6v1.5h2z"
        />
      </svg>
    ),
  },
];

export default function SocialAuthRow({ onSelect = () => {} }) {
  return (
    <div>
      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-ink-200" />
        <span className="text-xs text-ink-400">or continue with</span>
        <span className="h-px flex-1 bg-ink-200" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {PROVIDERS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            className="flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white py-2.5 text-sm font-medium text-ink-900 transition-colors hover:bg-ink-50"
          >
            {p.icon}
            <span>{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
