// Matrix component — 3 view modes: heatmap, numbers, bars
// Renders the 8 owners × 5 weeks grid (the "전체 진척 매트릭스")

const { useMemo } = React;

function MatrixView({ guides, owners, mode, hoverCell, onHoverCell, onClickCell, onClickOwner, onClickWeek, selected, selOwners, selWeeks }) {
  // mode: 'heat' | 'num' | 'bars'

  const { counts, weekTotals, ownerTotals, max, max105 } = useMemo(() => {
    const c = {}; // c[ownerId][week] = count
    owners.forEach(o => { c[o.id] = {1:0,2:0,3:0,4:0,5:0}; });
    guides.forEach(g => { if (c[g.owner]) c[g.owner][g.week]++; });

    let max = 0;
    const wT = {1:0,2:0,3:0,4:0,5:0};
    const oT = {};
    owners.forEach(o => {
      oT[o.id] = 0;
      for (let w=1; w<=5; w++) {
        oT[o.id] += c[o.id][w];
        wT[w] += c[o.id][w];
        if (c[o.id][w] > max) max = c[o.id][w];
      }
    });
    return { counts: c, weekTotals: wT, ownerTotals: oT, max, max105: 105 };
  }, [guides, owners]);

  // Heatmap intensity for a cell (0..1)
  const intensity = (n) => max ? Math.pow(n / max, 0.65) : 0;

  // Week phase labels — descriptive, not progress
  const WEEK_LABEL = {
    1: { ws: '부트스트랩',  range: 'Step 1–3' },
    2: { ws: '코어 도메인',  range: 'Step 4–6' },
    3: { ws: '통합',         range: 'Step 6–10' },
    4: { ws: '안정화',       range: 'Step 8–13' },
    5: { ws: '릴리즈',       range: 'Step 1–3' },
  };

  const isCellSelected = (ownerId, week) =>
    selected && selected.owner === ownerId && selected.week === week;

  return (
    <div className="matrix-wrap">
      <table className="matrix">
        <thead>
          <tr>
            <th style={{ width: 200 }}>담당자 · 8명</th>
            {[1,2,3,4,5].map(w => {
              const wOn = selWeeks && selWeeks.has(w);
              return (
                <th key={w} className={'week clickable' + (wOn ? ' on' : '')}
                    onClick={() => onClickWeek && onClickWeek(w)}
                    title={`W${w} 가이드만 보기`}>
                  <span className="wn">W{w}</span>
                  <span className="ws">{WEEK_LABEL[w].ws} · {WEEK_LABEL[w].range}</span>
                </th>
              );
            })}
            <th style={{ width: 84, textAlign: 'right', paddingRight: 12 }}>전체</th>
          </tr>
        </thead>
        <tbody>
          {owners.map(o => {
            const oOn = selOwners && selOwners.has(o.id);
            return (
            <tr key={o.id}>
              <th className={'owner-th clickable' + (oOn ? ' on' : '')}
                  onClick={() => onClickOwner && onClickOwner(o.id)}
                  title={`${o.label} 가이드만 보기`}>
                <div className="who">
                  <span className="sw" style={{ background: o.color }}></span>
                  <span>{o.label}</span>
                  <span className="nm">{o.name}</span>
                </div>
              </th>
              {[1,2,3,4,5].map(w => {
                const n = counts[o.id][w];
                const t = intensity(n);
                const heatBg = mode === 'heat'
                  ? `color-mix(in oklab, var(--heat-max) ${Math.round(t*100)}%, transparent)`
                  : undefined;
                const sel = isCellSelected(o.id, w);
                return (
                  <td
                    key={w}
                    style={{ background: heatBg }}
                    onMouseEnter={() => onHoverCell && onHoverCell({ owner: o.id, week: w, n })}
                    onMouseLeave={() => onHoverCell && onHoverCell(null)}
                    onClick={() => onClickCell && onClickCell(o.id, w)}
                    title={`${o.label} · W${w}: ${n}개 가이드`}
                  >
                    <div className="cell" style={{
                      boxShadow: sel ? `inset 0 0 0 2px var(--accent)` : undefined,
                    }}>
                      {mode === 'heat' && (
                        <>
                          <span className={'count-big ' + (n === 0 ? 'empty' : '') + (t > 0.55 ? ' count-on-heat' : '')}>
                            {n || '—'}
                          </span>
                          <span className="meta">
                            {n > 0 ? <span>가이드</span> : <span>없음</span>}
                          </span>
                        </>
                      )}
                      {mode === 'num' && (
                        <>
                          <span className={'count-big ' + (n === 0 ? 'empty' : '')}>
                            {n || '—'}
                          </span>
                          <span className="meta">
                            {n > 0 && <span>W{w} · {WEEK_LABEL[w].ws}</span>}
                          </span>
                        </>
                      )}
                      {mode === 'bars' && (
                        <BarsCell n={n} max={max} owner={o} weekTotal={weekTotals[w]} />
                      )}
                    </div>
                  </td>
                );
              })}
              <td style={{ background: 'transparent', cursor: 'default', borderRight: 'none' }}>
                <div className="cell" style={{ alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row', gap: 8, paddingRight: 12 }}>
                  <RowSpark counts={counts[o.id]} max={max} color={o.color} />
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
                    {ownerTotals[o.id]}
                  </span>
                </div>
              </td>
            </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>주차별 가이드 수</th>
            {[1,2,3,4,5].map(w => (
              <td key={w} style={{ textAlign: 'center' }}>
                <span className="tot">{weekTotals[w]}</span>
              </td>
            ))}
            <td style={{ textAlign: 'right', paddingRight: 12 }}>
              <span className="tot">{max105}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function BarsCell({ n, max, weekTotal }) {
  // 5 vertical bars of varying heights representing the relative weight of this cell
  // Show n bars stacked visually, but cap visualization at max
  const bars = Array.from({ length: max }, (_, i) => i < n);
  return (
    <>
      <div className="bars" style={{ flex: 1, alignItems: 'flex-end' }}>
        {bars.map((on, i) => (
          <i key={i} style={{
            height: on ? `${30 + i * 14}%` : '6%',
            background: on ? 'var(--accent)' : 'var(--rule)',
            opacity: on ? (0.5 + (i / max) * 0.5) : 1,
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14, fontWeight: 600 }}>{n || '—'}</span>
      </div>
    </>
  );
}

function RowSpark({ counts, max, color }) {
  return (
    <svg width="60" height="24" viewBox="0 0 60 24" style={{ overflow: 'visible' }}>
      {[1,2,3,4,5].map(w => {
        const v = counts[w] / max;
        const h = Math.max(2, v * 22);
        const x = (w - 1) * 12 + 2;
        return (
          <rect key={w} x={x} y={24 - h} width="8" height={h}
            rx="1" fill="var(--accent)" opacity={0.35 + v * 0.65} />
        );
      })}
    </svg>
  );
}

window.MatrixView = MatrixView;
