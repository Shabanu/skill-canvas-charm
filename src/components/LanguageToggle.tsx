import { useLanguage } from "../lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-border bg-card/80 p-1 shadow-md backdrop-blur">
      {(["en", "nl"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={code === "en" ? "Switch to English" : "Schakel naar Nederlands"}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-110 ${
            lang === code
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
