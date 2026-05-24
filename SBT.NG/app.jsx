/* SBT — App entry, nav, hero, language + tweaks orchestration */
const { useState, useEffect, useMemo, useRef } = React;

const LANGS = [
{ code: "en", label: "English", code_short: "EN" },
{ code: "zh", label: "中文", code_short: "ZH" },
{ code: "ha", label: "Hausa", code_short: "HA" }];


const ACCENT_OPTIONS = [
{ name: "Emerald", val: "#0E5C3A", ink: "#F5F2EA" },
{ name: "Clay", val: "#D9531E", ink: "#FAF8F2" },
{ name: "Indigo", val: "#1E3A8A", ink: "#F5F2EA" },
{ name: "Lime", val: "#9FE870", ink: "#0A0A0A" }];


// ---------- Language dropdown ----------
function LangDropdown({ lang, onLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGS.find((l) => l.code === lang) || LANGS[0];

  useEffect(() => {
    function click(e) {
      if (!ref.current?.contains(e.target)) setOpen(false);
    }
    function key(e) {if (e.key === "Escape") setOpen(false);}
    document.addEventListener("mousedown", click);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", click);
      document.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <div className="lang-drop" data-open={open} ref={ref}>
      <button className="lang-drop-btn" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open}>
        <svg className="globe" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18 M12 3a13 13 0 0 1 0 18 M12 3a13 13 0 0 0 0 18" />
        </svg>
        <span>{current.code_short}</span>
        <span className="caret">▾</span>
      </button>
      <div className="lang-drop-menu" role="listbox">
        {LANGS.map((l) =>
        <button
          key={l.code}
          className={`lang-drop-item ${lang === l.code ? "active" : ""}`}
          onClick={() => {onLang(l.code);setOpen(false);}}
          role="option"
          aria-selected={lang === l.code}>
          
            <span>{l.label}</span>
            <span className="lbl-code">{l.code_short}</span>
            <span className="check">✓</span>
          </button>
        )}
      </div>
    </div>);

}

// ---------- Nav ----------
function Nav({ t, lang, onLang }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="brand" aria-label="IBS · Initial Banking System">
          <img src="assets/logo-mark.png" alt="IBS" className="brand-mark-img" />
        </a>
        <div className="nav-links">
          <a className="nav-link" href="#capabilities">{t.nav.product}</a>
          <a className="nav-link" href="#capabilities">{t.nav.capabilities}</a>
          <a className="nav-link" href="#demo">{t.nav.developers}</a>
          <a className="nav-link" href="#banks">{t.nav.banks}</a>
          <a className="nav-link" href="#licenses">{t.nav.company}</a>
        </div>
        <div className="nav-actions">
          <LangDropdown lang={lang} onLang={onLang} />
          <a className="btn btn--primary" href="#cta" style={{ padding: "10px 18px", fontSize: 14 }}>
            {t.nav.cta} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </nav>);

}

// ---------- Hero ----------
function Hero({ t }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow">
              <span className="live-dot" style={{ width: 7, height: 7 }} />
              <span className="txt">{t.hero.eyebrow_txt}</span>
            </div>
            <h1 className="h1" style={{ fontSize: "77px" }}>
              {t.hero.title_a}<br />
              <em style={{ fontFamily: "Fraunces", color: "rgb(15, 92, 58)" }}>{t.hero.title_b}</em><br />
              {t.hero.title_c}
            </h1>
            <p className="lead" style={{ marginTop: 32, maxWidth: "44ch" }}>
              {t.hero.lead}
            </p>
            <div className="hero-ctas">
              <a className="btn btn--primary" href="#cta">{t.hero.cta_primary} <span className="arrow">→</span></a>
              <a className="btn btn--ghost" href="#capabilities">{t.hero.cta_secondary}</a>
            </div>
          </div>
          <HeroVisual />
        </div>
      </div>
    </section>);

}

// ---------- Banks marquee ----------
function HeroBanksStrip({ t }) {
  return (
    <div className="container">
      <div className="banks-strip">
        <div className="lbl">{t.banks_strip.label} →</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <BanksMarquee />
        </div>
      </div>
    </div>);

}

// ---------- Tweaks panel ----------
function SBTTweaks() {
  const TPanel = window.TweaksPanel;
  const useTweaks = window.useTweaks;
  const { TweakSection, TweakColor, TweakRadio } = window;

  const [t, setT] = useTweaks(window.TWEAK_DEFAULTS || {
    accent: "#0E5C3A",
    theme: "light",
    density: "comfortable"
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", t.theme);
    root.setAttribute("data-density", t.density);
    const opt = ACCENT_OPTIONS.find((a) => a.val === t.accent) || ACCENT_OPTIONS[0];
    root.style.setProperty("--accent", opt.val);
    root.style.setProperty("--accent-ink", opt.ink);
  }, [t.accent, t.theme, t.density]);

  return (
    <TPanel title="Tweaks">
      <TweakSection label="Look & feel">
        <TweakColor
          label="Accent"
          value={t.accent}
          options={ACCENT_OPTIONS.map((a) => a.val)}
          onChange={(v) => setT("accent", v)} />
        
        <TweakRadio
          label="Theme"
          value={t.theme}
          options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]}
          onChange={(v) => setT("theme", v)} />
        
        <TweakRadio
          label="Density"
          value={t.density}
          options={[{ value: "comfortable", label: "Comfort" }, { value: "compact", label: "Compact" }]}
          onChange={(v) => setT("density", v)} />
        
      </TweakSection>
    </TPanel>);

}

// ---------- App root ----------
function App() {
  const dict = window.SBT_I18N;
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("sbt_lang");
    if (saved && dict[saved]) return saved;
    return "en";
  });
  const t = dict[lang];

  useEffect(() => {
    localStorage.setItem("sbt_lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  }, [lang]);

  const Arch = window.ArchitectureSectionV2 || window.ArchitectureSection;

  return (
    <>
      <Nav t={t} lang={lang} onLang={setLang} />
      <Hero t={t} />
      <HeroBanksStrip t={t} />
      <ProblemSection t={t} />
      <CapabilitiesSection t={t} />
      <DemoSection t={t} />
      <Arch t={t} />
      <CustomersSection t={t} />
      <PortalSection t={t} />
      <BanksSection t={t} />
      <EcoSection t={t} />
      <CTASection t={t} />
      <Footer t={t} />
      <SBTTweaks />
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);