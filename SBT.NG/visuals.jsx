/* SBT — Hero visual & capability UI mocks
   Replaces the bulk of the code-window content with richer renderings.
*/

const { useState, useEffect } = React;

// ────────────────────────────────────────────────────────────────
// HERO VISUAL — Live routing card
// ────────────────────────────────────────────────────────────────
function HeroVisual() {
  // Pulse through banks as routing demo
  const banks = ["Sterling", "Jaiz", "Greenwich", "Otech", "Alternative"];
  const [routeI, setRouteI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRouteI(i => (i + 1) % banks.length), 1800);
    return () => clearInterval(id);
  }, []);

  // Live transaction ticker
  const ticker = [
    { who: "Adesola Okonkwo", ref: "ord_AB7Z", amt: "₦ 2,500.00", bank: "Sterling", st: "ok" },
    { who: "Halima Bello", ref: "sub_004", amt: "₦ 18,000.00", bank: "Jaiz", st: "ok" },
    { who: "Tunde Ifeoma", ref: "ord_X9Q1", amt: "₦ 7,300.00", bank: "Greenwich", st: "pending" },
    { who: "SME Payroll", ref: "payroll_27", amt: "₦ 1,240,000", bank: "Sterling", st: "ok" },
    { who: "Brightspark", ref: "fx_3", amt: "$ 12,500.00", bank: "Alternative", st: "ok" },
  ];
  const [tickI, setTickI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTickI(i => (i + 1) % ticker.length), 2200);
    return () => clearInterval(id);
  }, []);

  const currentBank = banks[routeI];

  return (
    <div className="hero-visual">
      {/* Floating "verified" chip — top-left */}
      <div className="hv-chip hv-chip--tl">
        <span className="hv-check">✓</span>
        <div>
          <div className="hv-chip-lbl">BVN verified</div>
          <div className="hv-chip-sub">2219 87** 5432</div>
        </div>
      </div>

      {/* Floating "+N settled" toast — top-right */}
      <div className="hv-chip hv-chip--tr">
        <span className="live-dot" />
        <div>
          <div className="hv-chip-lbl">+₦ 2,500 settled</div>
          <div className="hv-chip-sub">Sterling · 340ms</div>
        </div>
      </div>

      {/* Main routing card */}
      <div className="hv-card">
        <div className="hv-card-bar">
          <div className="hv-card-dots"><span/><span/><span/></div>
          <div className="hv-card-url">
            <span className="hv-method">POST</span>
            api.ibt.ng/v1/payments
          </div>
          <div className="hv-status"><span className="live-dot"/>201</div>
        </div>

        <div className="hv-card-body">
          {/* Request summary */}
          <div className="hv-row">
            <span className="hv-row-lbl">Reference</span>
            <span className="hv-row-val">ord_2026_05_18_AB7Z</span>
          </div>
          <div className="hv-row">
            <span className="hv-row-lbl">Amount</span>
            <span className="hv-row-val hv-mono"><strong>₦ 2,500.00</strong> NGN</span>
          </div>
          <div className="hv-row">
            <span className="hv-row-lbl">Capability</span>
            <span className="hv-row-val hv-mono">collect.bank_transfer</span>
          </div>

          <div className="hv-divider" />

          {/* Routing band */}
          <div className="hv-section-lbl">Routing</div>
          <div className="hv-route-rail">
            {banks.map((b, i) => (
              <div key={i} className={`hv-route-bank ${i === routeI ? "is-active" : ""}`}>
                <BankLogo name={b} size="sm" />
              </div>
            ))}
          </div>

          {/* Resulting virtual account */}
          <div className="hv-va-card">
            <div className="hv-va-head">
              <div className="hv-va-bank">
                <BankLogo name={currentBank} size="sm" />
              </div>
              <div className="hv-va-ttl">Virtual account · expires 28:42</div>
            </div>
            <div className="hv-va-acct">9912 3456 70</div>
            <div className="hv-va-name">IBS / SME PAYROLL</div>
          </div>

          {/* Footer ticker */}
          <div className="hv-ticker">
            <div className="hv-ticker-lbl">Live</div>
            <div className="hv-ticker-row" key={tickI}>
              <span className="hv-ticker-who">{ticker[tickI].who}</span>
              <span className="hv-ticker-amt">{ticker[tickI].amt}</span>
              <span className={`hv-ticker-st hv-ticker-st--${ticker[tickI].st}`}>
                {ticker[tickI].st === "ok" ? "✓ settled" : "⏳ routing"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// CAPABILITY MOCKS — one per /accounts, /kyc, /payments, /payouts, /mandates
// ────────────────────────────────────────────────────────────────
function AccountsMock() {
  const txns = [
    { d: "May 18", who: "Inbound · Sterling", amt: "+ ₦ 2,500.00", st: "ok" },
    { d: "May 18", who: "Payroll batch", amt: "− ₦ 1,240,000", st: "ok" },
    { d: "May 17", who: "FX inbound", amt: "+ $ 12,500.00", st: "ok" },
    { d: "May 17", who: "Mandate · monthly", amt: "− ₦ 18,000.00", st: "pending" },
  ];
  return (
    <div className="cap-mock cap-mock--accounts">
      <div className="cap-mock-head">
        <BankLogo name="Sterling" size="sm" />
        <div className="cap-mock-pill">Account · tier 2</div>
      </div>
      <div className="cap-mock-acct">
        <div className="cap-mock-acct-num">0123 4567 89</div>
        <div className="cap-mock-acct-nm">ADESOLA OKONKWO</div>
      </div>
      <div className="cap-mock-bal-grid">
        <div className="cap-mock-bal">
          <span className="cap-mock-bal-lbl">Available</span>
          <span className="cap-mock-bal-val">₦ 245,300<span className="muted">.00</span></span>
        </div>
        <div className="cap-mock-bal">
          <span className="cap-mock-bal-lbl">Ledger</span>
          <span className="cap-mock-bal-val">₦ 245,300<span className="muted">.00</span></span>
        </div>
      </div>
      <div className="cap-mock-divider"><span>Recent transactions</span></div>
      <div className="cap-mock-txn-list">
        {txns.map((tx, i) => (
          <div key={i} className="cap-mock-txn">
            <span className="cap-mock-txn-d">{tx.d}</span>
            <span className="cap-mock-txn-who">{tx.who}</span>
            <span className={`cap-mock-txn-amt ${tx.amt.startsWith("+") ? "positive" : ""}`}>{tx.amt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KycMock() {
  return (
    <div className="cap-mock cap-mock--kyc">
      <div className="cap-mock-head">
        <span className="cap-mock-id-tag">BVN · 22198765432</span>
        <span className="cap-mock-pill cap-mock-pill--ok">✓ verified</span>
      </div>
      <div className="cap-mock-kyc-person">
        <div className="cap-mock-kyc-avatar">AO</div>
        <div>
          <div className="cap-mock-kyc-name">Adesola Okonkwo</div>
          <div className="cap-mock-kyc-sub">Date of birth · 1991-03-14</div>
        </div>
      </div>
      <div className="cap-mock-kyc-checks">
        <div className="cap-mock-kyc-check"><span className="cap-mock-kyc-ck">✓</span> Name match · <strong>exact</strong></div>
        <div className="cap-mock-kyc-check"><span className="cap-mock-kyc-ck">✓</span> Phone match · <strong>partial</strong></div>
        <div className="cap-mock-kyc-check"><span className="cap-mock-kyc-ck">✓</span> Identity active · <strong>since 2018</strong></div>
        <div className="cap-mock-kyc-check"><span className="cap-mock-kyc-ck">✓</span> NIN cross-check · <strong>pass</strong></div>
      </div>
      <div className="cap-mock-kyc-foot">
        <span>Result cached · re-usable for 90 days</span>
        <span className="cap-mock-mono">340ms</span>
      </div>
    </div>
  );
}

function CollectMock() {
  // Live countdown ticker
  const [s, setS] = useState(1722);
  useEffect(() => {
    const id = setInterval(() => setS(v => v > 0 ? v - 1 : 1799), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return (
    <div className="cap-mock cap-mock--collect">
      <div className="cap-mock-head">
        <span className="cap-mock-pill">Ephemeral VA</span>
        <span className="cap-mock-countdown"><span className="live-dot"/>{mm}:{ss}</span>
      </div>
      <div className="cap-mock-va">
        <BankLogo name="Sterling" size="sm" />
        <div className="cap-mock-va-num">9912 3456 70</div>
        <div className="cap-mock-va-nm">IBS / SME PAYROLL</div>
        <div className="cap-mock-va-amt">Expecting <strong>₦ 2,500.00</strong></div>
      </div>
      <div className="cap-mock-progress">
        <div className="cap-mock-progress-bar" style={{ width: `${100 - (s/1800*100)}%` }} />
      </div>
      <div className="cap-mock-events">
        <div className="cap-mock-event">
          <span className="cap-mock-event-dot ok"/>
          <span>VA created</span>
          <span className="cap-mock-mono">14:22:18</span>
        </div>
        <div className="cap-mock-event">
          <span className="cap-mock-event-dot ok"/>
          <span>Webhook URL verified</span>
          <span className="cap-mock-mono">14:22:18</span>
        </div>
        <div className="cap-mock-event live">
          <span className="cap-mock-event-dot wait"/>
          <span>Awaiting transfer</span>
          <span className="cap-mock-mono">live</span>
        </div>
      </div>
    </div>
  );
}

function PayoutMock() {
  return (
    <div className="cap-mock cap-mock--payout">
      <div className="cap-mock-head">
        <span className="cap-mock-pill">Cross-bank transfer</span>
        <span className="cap-mock-pill cap-mock-pill--ok">✓ settled</span>
      </div>
      <div className="cap-mock-payout-amount">
        <span className="cap-mock-payout-arrow">↗</span>
        <div>
          <div className="cap-mock-payout-big">₦ 1,240,000<span className="muted">.00</span></div>
          <div className="cap-mock-payout-sub">to Sterling · 0098765432</div>
        </div>
      </div>
      <div className="cap-mock-payout-steps">
        <div className="cap-mock-step done">
          <span className="cap-mock-step-num">1</span>
          <div>
            <div className="cap-mock-step-ttl">Name enquiry</div>
            <div className="cap-mock-step-sub">Adesola Okonkwo · matched</div>
          </div>
          <span className="cap-mock-mono">120ms</span>
        </div>
        <div className="cap-mock-step done">
          <span className="cap-mock-step-num">2</span>
          <div>
            <div className="cap-mock-step-ttl">Debit reserved</div>
            <div className="cap-mock-step-sub">Idempotency key locked</div>
          </div>
          <span className="cap-mock-mono">40ms</span>
        </div>
        <div className="cap-mock-step done">
          <span className="cap-mock-step-num">3</span>
          <div>
            <div className="cap-mock-step-ttl">NIBSS dispatch</div>
            <div className="cap-mock-step-sub">Transfer instruction sent</div>
          </div>
          <span className="cap-mock-mono">180ms</span>
        </div>
        <div className="cap-mock-step done">
          <span className="cap-mock-step-num">4</span>
          <div>
            <div className="cap-mock-step-ttl">Settlement</div>
            <div className="cap-mock-step-sub">Confirmed at counterparty</div>
          </div>
          <span className="cap-mock-mono">220ms</span>
        </div>
      </div>
    </div>
  );
}

function MandatesMock() {
  const stages = [
    { ttl: "Created", sub: "Customer signed mandate", st: "done" },
    { ttl: "Activated", sub: "Bank confirmed pull rights", st: "done" },
    { ttl: "Debit cycle", sub: "₦ 18,000 / month · 12 months", st: "active" },
    { ttl: "Auto-retry", sub: "On insufficient funds", st: "queued" },
  ];
  return (
    <div className="cap-mock cap-mock--mandates">
      <div className="cap-mock-head">
        <span className="cap-mock-pill">Mandate · monthly</span>
        <span className="cap-mock-pill cap-mock-pill--ok">Active</span>
      </div>
      <div className="cap-mock-mandate-info">
        <BankLogo name="Jaiz" size="sm" />
        <div>
          <div className="cap-mock-mandate-nm">Halima Bello</div>
          <div className="cap-mock-mandate-sub">sub_monthly_premium · cust_HB12</div>
        </div>
        <div className="cap-mock-mandate-amt">₦ 18,000<span className="muted">/mo</span></div>
      </div>
      <div className="cap-mock-mandate-grid">
        {stages.map((s, i) => (
          <div key={i} className={`cap-mock-mandate-stage cap-mock-mandate-stage--${s.st}`}>
            <div className="cap-mock-mandate-stage-st">
              {s.st === "done" && "✓"}
              {s.st === "active" && <span className="live-dot" />}
              {s.st === "queued" && "·"}
            </div>
            <div className="cap-mock-mandate-stage-ttl">{s.ttl}</div>
            <div className="cap-mock-mandate-stage-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="cap-mock-mandate-schedule">
        <span className="cap-mock-mandate-schedule-lbl">Next debit</span>
        <span className="cap-mock-mandate-schedule-d">Jun 1 · 09:00 WAT</span>
      </div>
    </div>
  );
}

const CAPABILITY_MOCKS = [AccountsMock, KycMock, CollectMock, PayoutMock, MandatesMock];

Object.assign(window, {
  HeroVisual, AccountsMock, KycMock, CollectMock, PayoutMock, MandatesMock,
  CAPABILITY_MOCKS,
});
