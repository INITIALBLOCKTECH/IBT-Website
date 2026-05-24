/* SBT — Architecture diagram v2 (richer layered platform) */

const ARCH_ICONS = {
  // Clients
  Web: "M3 5h18v12H3z M3 19h18 M9 17v2 M15 17v2",
  Mobile: "M7 3h10v18H7z M11 18h2",
  "POS / SaaS": "M3 7h18v10H3z M7 17v3 M17 17v3 M7 11h10",
  Backend: "M4 5h16v5H4z M4 14h16v5H4z M7 7.5h.01 M7 16.5h.01",
  "3rd-party": "M6 12h4 M14 12h4 M10 8a4 4 0 1 1 0 8 M14 8a4 4 0 1 0 0 8",
  // Gateway
  "REST v1": "M4 6h16 M4 12h16 M4 18h10",
  SDKs: "M8 4l-4 8 4 8 M16 4l4 8-4 8",
  Webhooks: "M9 13a4 4 0 1 1 4-4 M13 9l4 4M20 16a3 3 0 1 1-3-3",
  OAuth2: "M8 11V8a4 4 0 1 1 8 0v3 M6 11h12v9H6z",
  "Rate limits": "M12 4v6 M12 4l4 3 M5 13a7 7 0 1 0 14 0",
  Iyaka: "M12 4v6 M12 4l4 3 M5 13a7 7 0 1 0 14 0",
  "限流": "M12 4v6 M12 4l4 3 M5 13a7 7 0 1 0 14 0",
  // Domain
  Account: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-7 8-7s8 3 8 7",
  Accounts: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-7 8-7s8 3 8 7",
  "账户": "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-7 8-7s8 3 8 7",
  Asusu: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-7 8-7s8 3 8 7",
  KYC: "M9 12l2 2 4-4 M12 3l8 4v5c0 5-3 9-8 10-5-1-8-5-8-10V7z",
  Payment: "M3 8h18 M3 14h18 M7 18h4",
  Biya: "M3 8h18 M3 14h18 M7 18h4",
  "收款": "M3 8h18 M3 14h18 M7 18h4",
  Payout: "M3 17l6-6 4 4 8-8 M21 9V3h-6",
  "出款": "M3 17l6-6 4 4 8-8 M21 9V3h-6",
  Mandate: "M5 4h14v16H5z M9 8h6 M9 12h6 M9 16h4",
  "代扣": "M5 4h14v16H5z M9 8h6 M9 12h6 M9 16h4",
  Mandates: "M5 4h14v16H5z M9 8h6 M9 12h6 M9 16h4",
  Notify: "M15 17h5l-2-2v-5a6 6 0 1 0-12 0v5l-2 2h5 M10 21a2 2 0 1 0 4 0",
  "通知": "M15 17h5l-2-2v-5a6 6 0 1 0-12 0v5l-2 2h5 M10 21a2 2 0 1 0 4 0",
  Sanarwa: "M15 17h5l-2-2v-5a6 6 0 1 0-12 0v5l-2 2h5 M10 21a2 2 0 1 0 4 0",
  // Core
  "Bank routing": "M4 7h6l2 2h8v9H4z M8 12h6",
  "银行路由": "M4 7h6l2 2h8v9H4z M8 12h6",
  Idempotency: "M3 12a9 9 0 0 1 17-4 M21 12a9 9 0 0 1-17 4 M19 4v4h-4 M5 20v-4h4",
  "幂等": "M3 12a9 9 0 0 1 17-4 M21 12a9 9 0 0 1-17 4 M19 4v4h-4 M5 20v-4h4",
  "Ledger v1": "M3 5h18v14H3z M3 5l9 7 9-7",
  "Webhook hub": "M9 13a4 4 0 1 1 4-4 M13 9l4 4M20 16a3 3 0 1 1-3-3",
  "Webhook 总线": "M9 13a4 4 0 1 1 4-4 M13 9l4 4M20 16a3 3 0 1 1-3-3",
  "Event bus": "M4 12h2 M10 12h2 M16 12h2 M20 12h2",
  "事件总线": "M4 12h2 M10 12h2 M16 12h2 M20 12h2",
  "Audit log": "M9 12l2 2 4-4 M5 5h14v14H5z",
  "审计日志": "M9 12l2 2 4-4 M5 5h14v14H5z",
  // Risk
  "Risk engine": "M12 2l9 5v6c0 5-4 8-9 9-5-1-9-4-9-9V7z",
  "风控引擎": "M12 2l9 5v6c0 5-4 8-9 9-5-1-9-4-9-9V7z",
  AML: "M4 4h16v6H4z M4 14h7v6H4z M13 14h7v6h-7z",
  Sanctions: "M5 5l14 14 M19 5L5 19 M12 3v18 M3 12h18",
  "制裁名单": "M5 5l14 14 M19 5L5 19",
  "Limits": "M12 4v6 M12 4l4 3 M5 13a7 7 0 1 0 14 0",
  "限额": "M12 4v6 M12 4l4 3 M5 13a7 7 0 1 0 14 0",
  "FX risk": "M3 12h18 M8 7l-5 5 5 5 M16 7l5 5-5 5",
  "FX 风控": "M3 12h18 M8 7l-5 5 5 5 M16 7l5 5-5 5",
  // Adapters & banks
  Sterling: "M12 3 L19 8 V16 L12 21 L5 16 V8 Z",
  Jaiz: "M12 3 L14 10 L21 12 L14 14 L12 21 L10 14 L3 12 L10 10 Z",
  Greenwich: "M12 6 a6 6 0 1 1 0 12 a6 6 0 1 1 0 -12 M12 6 V18",
  "Otech MFB": "M12 4 a8 8 0 1 1 0 16 a8 8 0 1 1 0 -16 M12 9 a3 3 0 1 1 0 6 a3 3 0 1 1 0 -6",
  Alternative: "M6 18 L18 6 M10 6 H18 V14",
  // Rails
  NIBSS: "M3 7l9 5 9-5 M3 7v10l9 5 9-5V7 M12 12v10",
  CBN: "M3 8h18 M3 21h18 M5 8v13 M19 8v13 M9 8v13 M15 8v13 M12 4l9 4H3z",
  "BVN / NIN": "M12 4l8 4v6c0 4-3 7-8 8-5-1-8-4-8-8V8z M9 12l2 2 4-4",
  "FX Window": "M3 4h18v16H3z M3 12h18 M12 4v16",
  PAPSS: "M12 4a8 8 0 1 0 0 16 8 8 0 1 0 0-16 M4 12h16 M12 4c3 3 3 13 0 16 M12 4c-3 3-3 13 0 16",
};

function ArchIcon({ name }) {
  const d = ARCH_ICONS[name];
  if (!d) return null;
  return (
    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function ArchitectureSectionV2({ t }) {
  return (
    <section className="section" id="architecture">
      <div className="container">
        <SectionHead
          ix="04"
          eyebrow={t.arch.eyebrow}
          title={<>{t.arch.title_a}<em>{t.arch.title_b_em}</em></>}
          lead={t.arch.lead}
        />
        <Reveal className="arch2">
          <div className="arch2-flow" aria-hidden="true">
            <div className="pulse" style={{ animationDelay: "0s" }} />
            <div className="pulse" style={{ animationDelay: "1.5s" }} />
            <div className="pulse" style={{ animationDelay: "3s" }} />
          </div>
          {t.arch.rows.map((row, i) => {
            const variants = ["clients", "gateway", "domain", "core", "risk", "adapters", "rails"];
            const variant = variants[i] || "domain";
            return (
              <div key={i} className={`arch2-lane arch2-lane--${variant}`}>
                <div className="arch2-side">
                  <span className="lyr-num">L{String(i+1).padStart(2,"0")}</span>
                  <span className="lyr-lbl">{row.lyr}</span>
                  <span className="lyr-nm">{row.nm}</span>
                </div>
                <div className="arch2-rail">
                  {row.mods.map((m, mi) => (
                    <div key={mi} className="arch2-chip">
                      <div>
                        <div className="nm">{m.t}</div>
                        <div className="sub">{m.s}</div>
                      </div>
                      <ArchIcon name={m.t} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { ArchitectureSectionV2, ArchIcon });
