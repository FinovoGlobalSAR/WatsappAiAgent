export default function SocialLogin() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-[#e0e8e9]" />

        <span className="text-[12px] text-[#829396] whitespace-nowrap">
          or continue with
        </span>

        <div className="h-px flex-1 bg-[#e0e8e9]" />
      </div>

      <button
        type="button"
        className="
          w-full
          h-[50px]
          rounded-xl
          border
          border-[#ccdadd]
          bg-white
          flex
          items-center
          justify-center
          gap-3
          text-[13px]
          font-semibold
          text-[#193b3e]
          hover:bg-[#f7fbfb]
          transition
        "
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M21.35 12.27c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.22Z"
          />

          <path
            fill="#34A853"
            d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
          />

          <path
            fill="#FBBC05"
            d="M6.54 13.58a5.85 5.85 0 0 1 0-3.16V7.89H3.3a9.75 9.75 0 0 0 0 8.22l3.24-2.53Z"
          />

          <path
            fill="#EA4335"
            d="M12 6.39c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.83 3.47 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 8.11 9.46 6.39 12 6.39Z"
          />
        </svg>

        Continue with Google
      </button>
    </div>
  );
}