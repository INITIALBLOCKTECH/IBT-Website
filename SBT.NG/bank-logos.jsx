/* SBT — partner bank logo components
   Uses the official partner bank PNG logos provided by the user.
*/

const BANK_META = {
  Sterling:    { file: "Sterling.png",    name: "Sterling Bank",      ratio: 3.27 },
  Jaiz:        { file: "Jaiz.png",        name: "Jaiz Bank",          ratio: 3.68 },
  Greenwich:   { file: "Greenwich.png",   name: "Greenwich Bank",     ratio: 3.79 },
  Otech:       { file: "Otech.png",       name: "Otech MFB",          ratio: 1.00 },
  Alternative: { file: "Alternative.png", name: "Alternative Bank",   ratio: 2.98 },
};

function BankLogo({ name, size = "md", showName = false }) {
  const meta = BANK_META[name] || BANK_META.Sterling;
  const h = size === "lg" ? 40 : size === "sm" ? 22 : 30;

  return (
    <div className={`bk-img-logo bk-img-logo--${size}`}>
      <img
        src={`assets/banks/${meta.file}`}
        alt={meta.name}
        style={{ height: h, width: "auto", display: "block", maxWidth: h * meta.ratio }}
        loading="lazy"
      />
      {showName && <span className="bk-img-name">{meta.name}</span>}
    </div>
  );
}

// Compact horizontal strip used in hero footer / trust strip
function BanksMarquee() {
  const items = ["Sterling", "Jaiz", "Greenwich", "Otech", "Alternative"];
  const doubled = [...items, ...items, ...items];
  return (
    <div className="bk-marquee">
      <div className="bk-marquee-track">
        {doubled.map((b, i) => (
          <div key={i} className="bk-marquee-item">
            <BankLogo name={b} size="md" />
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { BankLogo, BanksMarquee, BANK_META });
