/**
 * Generated cover art for a project card.
 *
 * Each project gets a unique but deterministic "system diagram" — nodes wired
 * left to right across three tiers — seeded from its slug. Deterministic matters:
 * this renders on the server, so anything random would break hydration. It also
 * means a project's artwork never changes between builds.
 *
 * No network images, no stock photography, and it scales to any card size.
 */

const hashSeed = (value) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

/** mulberry32 — small, fast, and stable across environments. */
const makeRandom = (seed) => {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const VIEW_W = 320;
const VIEW_H = 180;
const TIER_X = [44, 160, 276];

// The initials sit dead centre, so the middle tier is pushed into the top and
// bottom bands to keep the mark legible.
const CLEAR_TOP = 58;
const CLEAR_BOTTOM = 122;

const ProjectCover = ({ slug, initials, accent }) => {
  const random = makeRandom(hashSeed(slug));

  // 1–3 nodes per tier, vertically spread and jittered so no two covers align.
  const tiers = TIER_X.map((x, tierIndex) => {
    const middle = tierIndex === 1;
    const count = middle ? 2 : 1 + Math.round(random() * 1.4);
    const span = VIEW_H - 64;

    return Array.from({ length: count }, (_, nodeIndex) => {
      let y = 32 + (span / (count + 1)) * (nodeIndex + 1) + (random() * 16 - 8);
      if (middle) {
        // Snap above or below the mark rather than through it.
        y = nodeIndex === 0
          ? 24 + random() * (CLEAR_TOP - 32)
          : CLEAR_BOTTOM + random() * (VIEW_H - CLEAR_BOTTOM - 26);
      }
      return { x, y, round: random() > 0.55, filled: random() > 0.62 };
    });
  });

  // Wire every node forward to one node in the next tier, using an elbow path.
  const links = [];
  for (let tierIndex = 0; tierIndex < tiers.length - 1; tierIndex += 1) {
    tiers[tierIndex].forEach((from) => {
      const nextTier = tiers[tierIndex + 1];
      const to = nextTier[Math.floor(random() * nextTier.length)];
      const midX = from.x + (to.x - from.x) * (0.42 + random() * 0.2);
      links.push(`M ${from.x} ${from.y} H ${midX.toFixed(1)} V ${to.y.toFixed(1)} H ${to.x}`);
    });
  }

  const gradientId = `cover-${slug}`;

  return (
    <span className="nk-cover" style={{ "--c1": accent[0], "--c2": accent[1] }}>
      <svg
        className="nk-cover__art"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent[0]} />
            <stop offset="100%" stopColor={accent[1]} />
          </linearGradient>
        </defs>

        {links.map((path) => (
          <path key={path} d={path} className="nk-cover__wire" stroke={`url(#${gradientId})`} />
        ))}

        {tiers.flat().map((node) => (
          node.round ? (
            <circle
              key={`${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              r={node.filled ? 5.5 : 7}
              className={node.filled ? "nk-cover__node is-filled" : "nk-cover__node"}
              fill={node.filled ? `url(#${gradientId})` : "none"}
              stroke={`url(#${gradientId})`}
            />
          ) : (
            <rect
              key={`${node.x}-${node.y}`}
              x={node.x - 9}
              y={node.y - 6}
              width="18"
              height="12"
              rx="3"
              className={node.filled ? "nk-cover__node is-filled" : "nk-cover__node"}
              fill={node.filled ? `url(#${gradientId})` : "none"}
              stroke={`url(#${gradientId})`}
            />
          )
        ))}
      </svg>

      <span className="nk-cover__mark" aria-hidden="true">{initials}</span>
    </span>
  );
};

export default ProjectCover;
