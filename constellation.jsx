// Constellation strip — every guide as a dot, arranged W1..W5 left to right.
// Within each week column, dots are spread by step+owner.
// Highlights matching guides; muted others.

const { useMemo: _cM } = React;

function ConstellationStrip({ guides, allGuides, owners, onPick }) {
  const W = 1280, H = 220;
  const padL = 60, padR = 16, padT = 18, padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const colW = innerW / 5;

  const visibleIds = useMemo(() => new Set(guides.map(g => g.url)), [guides]);

  // Layout: group all guides by week, then by step (sub-rows), spread within column
  const points = useMemo(() => {
    const byWeek = {1:[],2:[],3:[],4:[],5:[]};
    allGuides.forEach(g => byWeek[g.week].push(g));
    const out = [];
    for (let w = 1; w <= 5; w++) {
      const arr = byWeek[w];
      // bucket by step within week
      const steps = {};
      arr.forEach(g => { (steps[g.step] = steps[g.step] || []).push(g); });
      const stepKeys = Object.keys(steps).map(Number).sort((a,b)=>a-b);
      const stepCount = stepKeys.length;
      stepKeys.forEach((s, sIdx) => {
        const sGuides = steps[s];
        const rowY = padT + (stepCount === 1 ? innerH / 2 : (sIdx + 0.5) * (innerH / stepCount));
        const colX = padL + (w - 1) * colW + 8;
        const stepWidth = colW - 16;
        const perRow = Math.min(sGuides.length, Math.ceil(stepWidth / 14));
        sGuides.forEach((g, i) => {
          const row = Math.floor(i / perRow);
          const col = i % perRow;
          const rowsTotal = Math.ceil(sGuides.length / perRow);
          const yOffset = (row - (rowsTotal - 1) / 2) * 9;
          const x = colX + (col + 0.5) * (stepWidth / perRow);
          const y = rowY + yOffset;
          out.push({ g, x, y, w, s });
        });
      });
    }
    return out;
  }, [allGuides]);

  const ownerColor = (id) => (window.OWNER_BY_ID[id] || {}).color || '#999';

  return (
    <div className="constellation">
      <div className="panel-head">
        <div className="title">
          <span>전 가이드 별자리</span>
          <span className="pill">105 NODES</span>
        </div>
        <div className="sub mono">
          현재 매칭 {guides.length} / 전체 {allGuides.length}
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="constellation-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="weekDivider" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--rule)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--rule)" stopOpacity="1" />
            <stop offset="80%" stopColor="var(--rule)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--rule)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* week dividers + labels */}
        {[0,1,2,3,4,5].map(i => (
          <line key={i}
            x1={padL + i * colW} y1={padT - 4}
            x2={padL + i * colW} y2={H - padB + 4}
            stroke="url(#weekDivider)" strokeWidth="1" strokeDasharray="2 4"
          />
        ))}
        {[1,2,3,4,5].map(w => (
          <g key={w}>
            <text x={padL + (w - 0.5) * colW} y={padT - 6}
              textAnchor="middle"
              style={{ fontSize: 11, fill: 'var(--mute)', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.08em' }}>
              W{w}
            </text>
            <text x={padL + (w - 0.5) * colW} y={H - 8}
              textAnchor="middle"
              style={{ fontSize: 10, fill: 'var(--mute)' }}>
              {allGuides.filter(g => g.week === w).length}개
            </text>
          </g>
        ))}

        {/* left scale */}
        <text x={padL - 8} y={H/2 + 4} textAnchor="end"
          style={{ fontSize: 10, fill: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          step
        </text>

        {/* dots */}
        {points.map(({ g, x, y }, i) => {
          const visible = visibleIds.has(g.url);
          const c = ownerColor(g.owner);
          return (
            <g key={i} style={{ cursor: 'pointer' }} onClick={() => onPick && onPick(g)}>
              <circle cx={x} cy={y} r={visible ? 4.5 : 3}
                fill={visible ? c : 'transparent'}
                stroke={visible ? c : 'var(--mute-2)'}
                strokeWidth={visible ? 0 : 1}
                opacity={visible ? 1 : 0.35}
              >
                <title>{`W${g.week} · Step ${g.step} · ${(window.OWNER_BY_ID[g.owner]||{}).label}\n${g.title}`}</title>
              </circle>
            </g>
          );
        })}
      </svg>

      <div className="constellation-legend">
        {owners.map(o => (
          <span key={o.id} className="lg">
            <span className="sw" style={{ background: o.color }}></span>
            {o.label}
          </span>
        ))}
      </div>
    </div>
  );
}

window.ConstellationStrip = ConstellationStrip;
