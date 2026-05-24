/* SBT — section components */
const { useState, useEffect, useMemo } = React;

// ---------- Shared bits ----------
function SectionHead({ eyebrow, title, lead }) {
  return (
    <div className="section-head">
      <div style={{ maxWidth: "62%", flex: "1 1 520px" }}>
        <h2 className="h2">{title}</h2>
      </div>
      {lead && <p className="lead" style={{ flex: "0 1 460px" }}>{lead}</p>}
    </div>
  );
}

// ---------- Problem ----------
function ProblemSection({ t }) {
  return (
    <section className="section" id="problem">
      <div className="container">
        <SectionHead
          ix="01"
          eyebrow={t.problem.eyebrow}
          title={<>{t.problem.title_a}<br/>{t.problem.title_b}<em>{t.problem.title_b_em}</em>{t.problem.title_b_after}</>}
          lead={t.problem.lead}
        />
        <Reveal className="problem-grid" stagger>
          {t.problem.cards.map((c, i) => (
            <div key={i} className="problem-cell">
              <div className="stat">{c.stat}</div>
              <div className="ttl">{c.ttl}</div>
              <div className="desc">{c.desc}</div>
            </div>
          ))}
        </Reveal>
        <p className="lead" style={{ marginTop: 32, color: "var(--ink-3)", fontSize: 14, maxWidth: "none" }}>
          {t.problem.footer}
        </p>
      </div>
    </section>
  );
}

// ---------- Capabilities tabs ----------
function CapabilitiesSection({ t }) {
  const [active, setActive] = useState(0);
  const cap = t.capabilities.tabs[active];
  const Mocks = window.CAPABILITY_MOCKS || [];
  const MockComponent = Mocks[active] || (() => null);

  return (
    <section className="section" id="capabilities">
      <div className="container">
        <SectionHead
          eyebrow={t.capabilities.eyebrow}
          title={<>{t.capabilities.title_a}<em>{t.capabilities.title_b_em}</em></>}
          lead={t.capabilities.lead}
        />
        <div className="cap-shell">
          <div className="cap-tabs" role="tablist">
            {t.capabilities.tabs.map((tab, i) => (
              <button
                key={i}
                className={`cap-tab ${i === active ? "active" : ""}`}
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={i === active}
              >
                <span className="num">{tab.num}</span>
                <span className="nm">{tab.nm}</span>
                <span className="path">{tab.path}</span>
              </button>
            ))}
          </div>
          <div className="cap-body">
            <div className="cap-text">
              <h3 className="ttl">{cap.ttl}</h3>
              <p className="desc">{cap.desc}</p>
              <div className="cap-features">
                {cap.features.map((f, i) => (
                  <div key={i} className="cap-feature">
                    <span className="ck">✓</span>
                    <div className="ft-text">
                      <span className="ft-ttl">{f.t}</span>
                      {f.d}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cap-demo">
              <MockComponent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeColorize({ text }) {
  // Lightweight JSON-ish syntax coloring
  const tokens = useMemo(() => {
    const lines = text.split("\n");
    return lines.map((line, li) => {
      const parts = [];
      const re = /("[^"]*")|(\b\d[\d_]*\b)|(\/\/[^\n]*)/g;
      let last = 0; let m;
      while ((m = re.exec(line)) !== null) {
        if (m.index > last) parts.push({ t: line.slice(last, m.index), c: "p" });
        if (m[1]) parts.push({ t: m[1], c: line.indexOf('":') > -1 && line.indexOf(m[1]) < line.indexOf('":') ? "k" : "s" });
        else if (m[2]) parts.push({ t: m[2], c: "n" });
        else if (m[3]) parts.push({ t: m[3], c: "c" });
        last = re.lastIndex;
      }
      if (last < line.length) parts.push({ t: line.slice(last), c: "p" });
      return <div key={li}>{parts.map((p, i) => <span key={i} className={p.c}>{p.t}</span>)}</div>;
    });
  }, [text]);
  return <>{tokens}</>;
}

// ---------- API demo flow ----------
function DemoSection({ t }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStage(s => (s + 1) % 5), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section section--dark" id="demo">
      <div className="container">
        <SectionHead
          eyebrow={t.demo.eyebrow}
          title={<><span style={{color: "#9FE870"}}>{t.demo.title_a}</span><em>{t.demo.title_b_em}</em></>}
          lead={t.demo.lead}
        />

        {/* Compact request + response cards on top */}
        <div className="demo-summary">
          <div className="demo-summary-card demo-summary-card--req">
            <div className="demo-summary-head">
              <span className="demo-summary-method">POST</span>
              <span className="demo-summary-url">api.ibt.ng/v1/payments</span>
            </div>
            <div className="demo-summary-rows">
              <div><span className="demo-summary-lbl">reference</span><span className="demo-summary-val">ord_2026_05_18_AB7Z</span></div>
              <div><span className="demo-summary-lbl">amount</span><span className="demo-summary-val"><strong>₦ 2,500.00</strong> NGN</span></div>
              <div><span className="demo-summary-lbl">capability</span><span className="demo-summary-val">collect.bank_transfer</span></div>
              <div><span className="demo-summary-lbl">prefer_bank</span><span className="demo-summary-val">auto</span></div>
            </div>
          </div>

          <div className="demo-summary-arrow">→</div>

          <div className="demo-summary-card demo-summary-card--res">
            <div className="demo-summary-head">
              <span className="demo-summary-status">201 Created</span>
              <span className="demo-summary-url">~340ms</span>
            </div>
            <div className="demo-summary-rows">
              <div><span className="demo-summary-lbl">routed to</span><span className="demo-summary-val">
                <span className="demo-bank-chip"><BankLogo name="Sterling" size="sm"/></span>
              </span></div>
              <div><span className="demo-summary-lbl">virtual account</span><span className="demo-summary-val demo-summary-mono">9912 3456 70</span></div>
              <div><span className="demo-summary-lbl">expires</span><span className="demo-summary-val">in 30:00</span></div>
              <div><span className="demo-summary-lbl">webhook</span><span className="demo-summary-val">on settlement →</span></div>
            </div>
          </div>
        </div>

        {/* Flow rail */}
        <div className="flow-rail" style={{ marginTop: 48 }}>
          {t.demo.flow.map((f, i) => (
            <div key={i} className={`flow-stage ${i === stage ? "active" : ""}`}>
              <div className="ix">{f.ix}</div>
              <div className="nm">{f.nm}</div>
              <div className="det">{f.det.split("\n").map((l, li) => <div key={li}>{l}</div>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Architecture ----------
function ArchitectureSection({ t }) {
  return (
    <section className="section" id="architecture">
      <div className="container">
        <SectionHead
          ix="04"
          eyebrow={t.arch.eyebrow}
          title={<>{t.arch.title_a}<em>{t.arch.title_b_em}</em></>}
          lead={t.arch.lead}
        />
        <div className="arch-stack">
          {t.arch.rows.map((row, i) => {
            const accentClass =
              i === 1 ? "arch-row--accent" :
              i === t.arch.rows.length - 1 ? "arch-row--banks" : "";
            return (
              <div key={i} className={`arch-row ${accentClass}`}>
                <div className="arch-label">
                  <div className="lyr">{row.lyr}</div>
                  <div className="nm">{row.nm}</div>
                </div>
                <div className="arch-modules">
                  {row.mods.map((m, mi) => (
                    <div key={mi} className="arch-mod">
                      <div>{m.t}</div>
                      <div className="sub">{m.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Customers ----------
const CUSTOMER_CASES = [
  // 01 — Chinese outbound
  [
    { mark: "YT", nm: "Yutong Africa",      color: "#C8102E" },
    { mark: "ZH", nm: "ZhongHai Logistics", color: "#1E3A8A" },
    { mark: "MX", nm: "Mingxin Trading",    color: "#0E5C3A" },
  ],
  // 02 — B2B SaaS & PSP
  [
    { mark: "LS", nm: "Layerstack",   color: "#5B2A8C" },
    { mark: "PO", nm: "PayloadOS",    color: "#0F5F8C" },
    { mark: "TH", nm: "TenantHub",    color: "#1F1F1F" },
  ],
  // 03 — Cross-border trade
  [
    { mark: "SL", nm: "Sino-Lagos",   color: "#D9531E" },
    { mark: "PT", nm: "Pearl Trade",  color: "#0E5C3A" },
    { mark: "AC", nm: "Auralis Cargo",color: "#7B1F2A" },
  ],
  // 04 — Payroll & HRTech
  [
    { mark: "WB", nm: "WageBox",      color: "#0F5F8C" },
    { mark: "SH", nm: "SalaryHub",    color: "#0E5C3A" },
    { mark: "CL", nm: "Crewline",     color: "#1F1F1F" },
  ],
  // 05 — E-commerce & subs
  [
    { mark: "CL", nm: "Cartlift",     color: "#B8336A" },
    { mark: "SN", nm: "Subly NG",     color: "#5B2A8C" },
    { mark: "MR", nm: "Marketrail",   color: "#D9531E" },
  ],
  // 06 — Fintech & lending
  [
    { mark: "QL", nm: "Quickloan NG", color: "#0E5C3A" },
    { mark: "SF", nm: "Stakeflow",    color: "#1E3A8A" },
    { mark: "MB", nm: "Mintbase",     color: "#0F8F8C" },
  ],
];

function CaseLogo({ mark, nm, color }) {
  return (
    <span className="case-logo">
      <span className="case-logo-mark" style={{ background: color }}>{mark}</span>
      {nm}
    </span>
  );
}

function CustomersSection({ t }) {
  return (
    <section className="section" id="customers">
      <div className="container">
        <SectionHead
          eyebrow={t.customers.eyebrow}
          title={<>{t.customers.title_a}<em>{t.customers.title_b_em}</em></>}
          lead={t.customers.lead}
        />
        <Reveal className="cust-grid" stagger>
          {t.customers.cards.map((c, i) => (
            <div key={i} className="cust-card" onMouseMove={cursorGlow}>
              <div className="nm">{c.nm}</div>
              <div className="desc">{c.desc}</div>
              <div className="tags">
                {c.tags.map((tag, ti) => <span key={ti} className="tag">{tag}</span>)}
              </div>
              <div className="cust-cases">
                <span className="cust-cases-lbl">{t.customers.cases_label || "Example customers"}</span>
                {(CUSTOMER_CASES[i] || []).map((cs, ci) => <CaseLogo key={ci} {...cs} />)}
              </div>
            </div>
          ))}
        </Reveal>
        <div style={{ marginTop: 36, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          <span className="label-mono">{t.customers.fit_label}</span>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {t.customers.fit.map((f, i) => (
              <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-2)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }} />
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Portal preview ----------
function PortalSection({ t }) {
  return (
    <section className="section" id="portal">
      <div className="container">
        <SectionHead
          ix="06"
          eyebrow={t.portal.eyebrow}
          title={<>{t.portal.title_a}<em>{t.portal.title_b_em}</em></>}
          lead={t.portal.lead}
        />
        <div className="portal">
          <div className="portal-bar">
            <div className="dots"><span/><span/><span/></div>
            <div className="url">app.ibt.ng / dashboard / transactions</div>
            <div style={{ width: 60 }} />
          </div>
          <div className="portal-body">
            <aside className="portal-side">
              <div className="org">
                <div className="av">SP</div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ fontWeight: 500, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.portal.org}</div>
                  <div style={{ fontSize: 10, color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>ID · {t.portal.org_id}</div>
                </div>
              </div>
              {t.portal.nav_groups.map((g, gi) => (
                <div key={gi}>
                  <div className="grp">{g.ttl}</div>
                  {g.items.map((it, ii) => (
                    <div key={ii} className={`nav-item ${it === t.portal.active_item ? "active" : ""}`}>
                      <span>{it}</span>
                      {it === t.portal.active_item && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, opacity: 0.7 }}>▾</span>}
                    </div>
                  ))}
                </div>
              ))}
            </aside>
            <main className="portal-main">
              <div className="portal-title">
                <div>
                  <h4>{t.portal.ttl}</h4>
                  <div className="ttl-sub">{t.portal.ttl_sub}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn--ghost" style={{ padding: "8px 14px", fontSize: 12 }}>Filter</button>
                  <button className="btn btn--dark" style={{ padding: "8px 14px", fontSize: 12 }}>Export</button>
                </div>
              </div>
              <div className="portal-stats">
                {t.portal.stats.map((s, i) => (
                  <div key={i} className="portal-stat">
                    <div className="lbl">{s.lbl}</div>
                    <div className="val">{s.val}</div>
                    <div className="delta">{s.delta}</div>
                  </div>
                ))}
              </div>
              <table className="portal-table">
                <thead>
                  <tr>{t.portal.cols.map((c, i) => <th key={i}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {t.portal.rows.map((r, ri) => (
                    <tr key={ri}>
                      <td className="ref">{r[0]}</td>
                      <td style={{ fontFamily: "var(--font-sans)" }}>{r[1]}</td>
                      <td>{r[2]}</td>
                      <td style={{ fontFamily: "var(--font-sans)" }}>{r[3]}</td>
                      <td><span className={`pill ${r[4].toLowerCase().includes("proc") || r[4].includes("处理") || r[4].includes("aiki") ? "pill--proc" : ""} ${r[4].toLowerCase().includes("fail") || r[4].includes("失败") || r[4].includes("kasa") ? "pill--fail" : ""}`}>{r[4]}</span></td>
                      <td style={{ color: "var(--ink-3)" }}>{r[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Roadmap ----------
function RoadmapSection({ t }) {
  return (
    <section className="section" id="roadmap">
      <div className="container">
        <SectionHead
          ix="07"
          eyebrow={t.roadmap.eyebrow}
          title={<>{t.roadmap.title_a}<em>{t.roadmap.title_b_em}</em></>}
          lead={t.roadmap.lead}
        />
        <Reveal className="road" stagger>
          {t.roadmap.steps.map((s, i) => (
            <div key={i} className={`road-step ${i === 2 ? "is-now" : ""}`}>
              <div className="when">
                {i === 2 && <span className="now-dot" />}
                {s.when}
              </div>
              <div className="ttl">{s.ttl}</div>
              <div className="desc">{s.desc}</div>
              <div className="checks">
                {s.checks.map((c, ci) => <span key={ci}>· {c}</span>)}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Banks ----------
function BanksSection({ t }) {
  return (
    <section className="section" id="banks">
      <div className="container">
        <SectionHead
          ix="08"
          eyebrow={t.banks.eyebrow}
          title={<>{t.banks.title_a}<em>{t.banks.title_b_em}</em></>}
          lead={t.banks.lead}
        />
        <Reveal className="banks-grid" stagger>
          {t.banks.list.map((b, i) => {
            const logoKey = ["Sterling", "Jaiz", "Greenwich", "Otech", "Alternative"][i];
            return (
              <div key={i} className="bank-card">
                <div className="head-img">
                  <BankLogo name={logoKey} size="md" />
                </div>
                <div className="meta">
                  <div className="nm">{b.nm}</div>
                  <div className="role" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginTop: 4 }}>{b.role}</div>
                </div>
                <div className="desc">{b.desc}</div>
                <div className="feat">
                  {b.feat.map((f, fi) => <span key={fi}>{f}</span>)}
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Ecosystem ----------
const RAIL_ICONS = {
  NIBSS: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 7l9 5 9-5M3 7v10l9 5 9-5V7M12 12v10"/></svg>,
  CBN: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M12 4l9 6H3z"/></svg>,
  "BVN / NIN": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4l8 4v6c0 4-3 7-8 8-5-1-8-4-8-8V8z"/><path d="M9 12l2 2 4-4"/></svg>,
  "FX Window": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 12h18M12 4v16"/></svg>,
  PAPSS: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16"/></svg>,
};

function EcoSection({ t }) {
  return (
    <section className="section" id="ecosystem">
      <div className="container">
        <SectionHead
          eyebrow={t.eco.eyebrow}
          title={<>{t.eco.title_a}<em>{t.eco.title_b_em}</em></>}
          lead={t.eco.lead}
        />
        <Reveal className="rails-grid" stagger>
          {t.eco.rails.map((r, i) => (
            <div key={i} className="rail-card">
              <div className="rail-card-icon">
                {RAIL_ICONS[r.nm] || <span className="rail-card-icon-fallback">{r.nm.charAt(0)}</span>}
              </div>
              <div className="rail-card-body">
                <div className="rail-card-nm">{r.nm}</div>
                <div className="rail-card-role">{r.role}</div>
                <div className="rail-card-desc">{r.desc}</div>
              </div>
              <span className="rail-card-status">
                <span className="live-dot" /> live
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Licenses ----------
function LicensesSection({ t }) {
  return (
    <section className="section" id="licenses">
      <div className="container">
        <SectionHead
          ix="10"
          eyebrow={t.licenses.eyebrow}
          title={<>{t.licenses.title_a}<em>{t.licenses.title_b_em}</em></>}
          lead={t.licenses.lead}
        />
        <Reveal className="lic-grid" stagger>
          {t.licenses.cards.map((c, i) => (
            <div key={i} className={`lic-card lic-${c.state}`}>
              <div className="status">{c.status_label}</div>
              <div>
                <div className="ttl">{c.ttl}</div>
                <div className="ttl-sub" style={{ marginTop: 6 }}>{c.ttl_sub}</div>
              </div>
              <div className="desc">{c.desc}</div>
              <div className="meta">
                {c.meta.map((m, mi) => (
                  <div key={mi}>
                    <div className="lbl">{m.lbl}</div>
                    <div className="val">{m.val}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
        <p className="lead" style={{ marginTop: 24, fontSize: 13, color: "var(--ink-3)", maxWidth: "none" }}>
          {t.licenses.footer}
        </p>
      </div>
    </section>
  );
}

// ---------- CTA ----------
function CTASection({ t }) {
  return (
    <section className="cta-section" id="cta">
      <div className="container">
        <h2 className="h2" style={{ maxWidth: 18, lineHeight: 1, fontSize: "clamp(48px, 6vw, 88px)", maxWidth: "16ch" }}>
          {t.cta.title_a}<em>{t.cta.title_b_em}</em>{t.cta.title_c}
        </h2>
        <p className="lead" style={{ marginTop: 28, color: "#a3a095", maxWidth: "48ch" }}>{t.cta.lead}</p>
        <div className="ctas">
          <button className="btn btn--primary">{t.cta.primary} <span className="arrow">→</span></button>
          <button className="btn btn--ghost">{t.cta.secondary}</button>
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col" style={{ gridColumn: "span 1" }}>
            <div className="brand" style={{ marginBottom: 12 }}>
              <img src="assets/logo.png" alt="Initial Block Tech" className="brand-img brand-img--light" style={{ height: 30 }} />
              <img src="assets/logo-dark.png" alt="Initial Block Tech" className="brand-img brand-img--dark" style={{ height: 30 }} />
            </div>
            <p className="footer-about">{t.footer.about}</p>
          </div>
          <div className="footer-col">
            <h5>{t.footer.product}</h5>
            {t.footer.product_links.map((l, i) => <a key={i} href="#capabilities">{l}</a>)}
          </div>
          <div className="footer-col">
            <h5>{t.footer.developers}</h5>
            {t.footer.dev_links.map((l, i) => <a key={i} href="#">{l}</a>)}
          </div>
          <div className="footer-col">
            <h5>{t.footer.company}</h5>
            {t.footer.company_links.map((l, i) => <a key={i} href="#">{l}</a>)}
          </div>
          <div className="footer-col">
            <h5>{t.footer.contact}</h5>
            {t.footer.contact_links.map((l, i) => <a key={i} href="#">{l}</a>)}
          </div>
        </div>
        <div className="footer-meta">
          <span>{t.footer.legal}</span>
          <span>{t.footer.version}</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  ProblemSection, CapabilitiesSection, DemoSection, ArchitectureSection,
  CustomersSection, PortalSection, RoadmapSection, BanksSection,
  EcoSection, LicensesSection, CTASection, Footer,
});
