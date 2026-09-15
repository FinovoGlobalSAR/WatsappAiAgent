import AuthSidePanel from "./AuthSidePanel";

export default function AuthPageShell({
  brand,
  sideContent,
  switchPrompt,
  switchLabel,
  switchTo,
  title,
  subtitle,
  children,
}) {
  return (
    <main className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        <AuthSidePanel brand={brand} content={sideContent} />

        <section className="flex min-h-screen flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-ink-900">
                {title}
              </h2>

              <p className="mt-2 text-sm text-ink-400">
                {subtitle}
              </p>
            </div>

            {children}

            <p className="mt-7 text-center text-sm text-ink-400">
              {switchPrompt}{" "}
              <a
                href={switchTo}
                className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
              >
                {switchLabel}
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}