import FeatureIcon from "./FeatureIcon";

export default function AuthSidePanel({ brand, content }) {
  const {
    backgroundImage,
    imageAlt,
    headline,
    headlineSecondLine,
    description,
    features,
    quote,
  } = content;

  return (
    <div className="relative hidden w-[56%] shrink-0 lg:block">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={backgroundImage}
          alt={imageAlt}
          className="className=h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/45 to-brand-900/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/40 via-transparent to-transparent" />
      </div>

      <div className="pointer-events-none absolute -right-0.5 top-0 z-20 h-full w-24 lg:w-32 xl:w-36">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 45,0 C 25,120 105,420 20,1000 L 100,1000 L 100,0 Z"
            fill="#7c3aed"
          />

          <path
            d="M 49,0 C 29,120 109,420 24,1000 L 100,1000 L 100,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-10 py-10 xl:px-14 xl:py-12">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L12 4L20 12L12 20L4 12Z"
                  stroke="#4a1a94"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="#4a1a94" />
              </svg>
            </span>
            <span className="text-lg font-bold text-white">{brand.name}</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-white/60">
            {brand.navLinks.map((link, i) => (
              <span key={link} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/30">•</span>}
                {link.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl font-extrabold leading-[1.15] text-white xl:text-[2.6rem]">
            {headline.map((part, i) => (
              <span
                key={i}
                className={part.highlight ? "text-brand-300" : "text-white"}
              >
                {part.text}
              </span>
            ))}
            <br />
            <span
              className={
                headlineSecondLine.highlight ? "text-brand-300" : "text-white"
              }
            >
              {headlineSecondLine.text}
            </span>
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75">
            {description}
          </p>

          <ul className="mt-9 space-y-4">
            {features.map((feature) => (
              <li key={feature.title} className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm">
                  <FeatureIcon
                    name={feature.icon}
                    className="h-5 w-5 text-brand-200"
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {feature.title}
                  </span>
                  <span className="block text-xs text-white/60">
                    {feature.subtitle}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="font-script -rotate-2 text-3xl leading-[1.1] text-brand-200/90 xl:text-4xl">
          {quote.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
