/* SBT — shared hooks & utilities
   Scroll-based reveal/count-up. We use a single shared scroll listener
   (IntersectionObserver behaves inconsistently in some iframe previews).
*/

const __sbtRevealRegistry = new Set();
function __sbtScrollTick() {
  const vh = window.innerHeight;
  __sbtRevealRegistry.forEach(entry => {
    if (entry.done) return;
    const el = entry.ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // Trigger when top crosses (1 - threshold) of viewport (i.e. element is
    // entering the visible band).
    if (r.top < vh * (1 - entry.threshold) && r.bottom > 0) {
      entry.done = true;
      entry.fire();
    }
  });
}
if (typeof window !== "undefined" && !window.__sbtScrollWired) {
  window.__sbtScrollWired = true;
  window.addEventListener("scroll", __sbtScrollTick, { passive: true });
  window.addEventListener("resize", __sbtScrollTick, { passive: true });
  // Some iframe preview environments don't fire `scroll` events on programmatic
  // scrollTo calls — poll periodically as a safety net so reveals still fire.
  setInterval(__sbtScrollTick, 250);
}

function useReveal(threshold = 0.15) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const entry = {
      ref, threshold, done: false,
      fire: () => { if (ref.current) ref.current.classList.add("is-in"); }
    };
    __sbtRevealRegistry.add(entry);
    // Check immediately in case element is already on screen
    setTimeout(__sbtScrollTick, 0);
    return () => { __sbtRevealRegistry.delete(entry); };
  }, [threshold]);
  return ref;
}

function Reveal({ as = "div", className = "", stagger = false, children, ...rest }) {
  const ref = useReveal();
  const Tag = as;
  const cls = `${stagger ? "reveal-stagger" : "reveal"} ${className}`.trim();
  return <Tag ref={ref} className={cls} {...rest}>{children}</Tag>;
}

function useCountUp(target, { duration = 1300, decimals = 0, suffix = "", prefix = "", startOnMount = true } = {}) {
  const ref = React.useRef(null);
  const [val, setVal] = React.useState(0);
  const started = React.useRef(false);

  const begin = React.useCallback(() => {
    if (started.current) return;
    started.current = true;
    const start = Date.now();
    // Use setInterval — requestAnimationFrame is throttled in some iframe previews.
    const id = setInterval(() => {
      const now = Date.now();
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p >= 1) {
        setVal(target);
        clearInterval(id);
      }
    }, 33);
  }, [target, duration]);

  React.useEffect(() => {
    if (startOnMount) {
      const t = setTimeout(begin, 200);
      return () => clearTimeout(t);
    } else {
      const entry = { ref, threshold: 0.3, done: false, fire: begin };
      __sbtRevealRegistry.add(entry);
      setTimeout(__sbtScrollTick, 0);
      return () => { __sbtRevealRegistry.delete(entry); };
    }
  }, [begin, startOnMount]);

  const text = `${prefix}${val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`;
  return [ref, text];
}

function CountUp({ to, decimals = 0, suffix = "", prefix = "", duration = 1300, as = "span", className = "", startOnMount = true }) {
  const [ref, text] = useCountUp(to, { duration, decimals, suffix, prefix, startOnMount });
  const Tag = as;
  return <Tag ref={ref} className={className}>{text}</Tag>;
}

// Typing rotator — rotates through labels with type/erase animation.
function useTypingRotator(words, { typeMs = 70, holdMs = 1800, eraseMs = 35 } = {}) {
  const [out, setOut] = React.useState("");
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const word = words[i % words.length];
    let t;
    let cancelled = false;

    async function run() {
      for (let n = 0; n <= word.length; n++) {
        if (cancelled) return;
        setOut(word.slice(0, n));
        await new Promise(r => (t = setTimeout(r, typeMs)));
      }
      await new Promise(r => (t = setTimeout(r, holdMs)));
      if (cancelled) return;
      for (let n = word.length; n >= 0; n--) {
        if (cancelled) return;
        setOut(word.slice(0, n));
        await new Promise(r => (t = setTimeout(r, eraseMs)));
      }
      setI(prev => (prev + 1) % words.length);
    }
    run();
    return () => { cancelled = true; clearTimeout(t); };
  }, [i, words.join("|"), typeMs, holdMs, eraseMs]);

  return out;
}

// Cursor-follow glow helper — sets --mx/--my custom properties on element.
function cursorGlow(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

Object.assign(window, { useReveal, Reveal, useCountUp, CountUp, useTypingRotator, cursorGlow });
