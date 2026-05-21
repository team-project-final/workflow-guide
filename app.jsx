// Synapse 가이드 매니저 — main app
// Search + filter dashboard for 105 workflow guides

const { useState, useEffect, useMemo: appUseMemo, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme":   "light",
  "accent":  "signal",
  "matrix":  "heat",
  "density": "comfortable",
  "layout":  "list"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  { id: 'signal', label: '시그널 레드',  swatch: '#d94b3b' },
  { id: 'teal',   label: '서비스 틸',    swatch: '#0ea5a5' },
  { id: 'indigo', label: '인디고',       swatch: '#5b5be7' },
  { id: 'amber',  label: '앰버',         swatch: '#d97706' },
  { id: 'lime',   label: '라임',         swatch: '#65a30d' },
];

function applyThemeTokens(t) {
  const r = document.documentElement;
  r.setAttribute('data-theme', t.theme || 'light');
  // signal red is the default, no attribute needed; others apply override
  if (!t.accent || t.accent === 'signal') r.removeAttribute('data-accent');
  else r.setAttribute('data-accent', t.accent);
  r.setAttribute('data-density', t.density || 'comfortable');
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => { applyThemeTokens(tweaks); }, [tweaks.theme, tweaks.accent, tweaks.density]);

  const GUIDES = window.GUIDES;
  const OWNERS = window.OWNERS;

  // ----- filter state -----
  const [q, setQ] = useState('');
  const [selOwners, setSelOwners] = useState(new Set());
  const [selWeeks, setSelWeeks]   = useState(new Set());
  const [selSteps, setSelSteps]   = useState(new Set());
  const [selTags, setSelTags]     = useState(new Set());
  const [sortBy, setSortBy]       = useState('week'); // 'week' | 'owner' | 'title'
  const [hoverCell, setHoverCell] = useState(null);

  const searchRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current && searchRef.current.focus();
      } else if (e.key === 'Escape') {
        setQ('');
        searchRef.current && searchRef.current.blur();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ----- derived -----
  const allTags = appUseMemo(() => {
    const m = new Map();
    GUIDES.forEach(g => g.tags.forEach(t => m.set(t, (m.get(t) || 0) + 1)));
    return [...m.entries()].sort((a,b) => b[1] - a[1]);
  }, [GUIDES]);

  const allSteps = appUseMemo(() => {
    const s = new Set(); GUIDES.forEach(g => s.add(g.step));
    return [...s].sort((a,b)=>a-b);
  }, [GUIDES]);

  const ownerTotals = appUseMemo(() => {
    const t = {}; OWNERS.forEach(o => t[o.id] = 0);
    GUIDES.forEach(g => t[g.owner]++);
    return t;
  }, [GUIDES, OWNERS]);

  const ownerMax = appUseMemo(() => Math.max(...Object.values(ownerTotals)), [ownerTotals]);

  // search tokens
  const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const filtered = appUseMemo(() => {
    return GUIDES.filter(g => {
      if (selOwners.size && !selOwners.has(g.owner)) return false;
      if (selWeeks.size  && !selWeeks.has(g.week))  return false;
      if (selSteps.size  && !selSteps.has(g.step))  return false;
      if (selTags.size) {
        for (const t of selTags) if (!g.tags.includes(t)) return false;
      }
      if (tokens.length) {
        const hay = (g.title + ' ' + g.slug + ' ' + g.tags.join(' ')).toLowerCase();
        for (const t of tokens) if (!hay.includes(t)) return false;
      }
      return true;
    });
  }, [GUIDES, selOwners, selWeeks, selSteps, selTags, q]);

  const sorted = appUseMemo(() => {
    const a = [...filtered];
    if (sortBy === 'week') a.sort((x,y) => x.week-y.week || x.step-y.step || x.owner.localeCompare(y.owner));
    else if (sortBy === 'owner') a.sort((x,y) => x.owner.localeCompare(y.owner) || x.week-y.week || x.step-y.step);
    else if (sortBy === 'title') a.sort((x,y) => x.title.localeCompare(y.title, 'ko'));
    return a;
  }, [filtered, sortBy]);

  // toggle helpers
  const toggleSet = (setter) => (val) => setter(prev => {
    const n = new Set(prev);
    if (n.has(val)) n.delete(val); else n.add(val);
    return n;
  });
  const tOwner = toggleSet(setSelOwners);
  const tWeek  = toggleSet(setSelWeeks);
  const tStep  = toggleSet(setSelSteps);
  const tTag   = toggleSet(setSelTags);

  const clearAll = () => {
    setQ(''); setSelOwners(new Set()); setSelWeeks(new Set()); setSelSteps(new Set()); setSelTags(new Set());
  };
  const hasFilters = !!(q || selOwners.size || selWeeks.size || selSteps.size || selTags.size);

  // matrix click → toggle owner+week
  const handleMatrixClick = (ownerId, week) => {
    const same = selOwners.size === 1 && selOwners.has(ownerId) && selWeeks.size === 1 && selWeeks.has(week);
    if (same) {
      setSelOwners(new Set()); setSelWeeks(new Set());
    } else {
      setSelOwners(new Set([ownerId])); setSelWeeks(new Set([week]));
    }
  };

  // search highlighter
  const renderTitle = (title) => {
    if (!tokens.length) return title;
    let parts = [title];
    tokens.forEach(tok => {
      const next = [];
      parts.forEach(part => {
        if (typeof part !== 'string') { next.push(part); return; }
        let lower = part.toLowerCase();
        let i = 0;
        while (true) {
          const idx = lower.indexOf(tok, i);
          if (idx < 0) { next.push(part.slice(i)); break; }
          next.push(part.slice(i, idx));
          next.push(<mark key={`${tok}-${idx}-${Math.random()}`}>{part.slice(idx, idx + tok.length)}</mark>);
          i = idx + tok.length;
        }
      });
      parts = next;
    });
    return parts;
  };

  // unused

  return (
    <div className="app">
      {/* ========== Top bar ========== */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="brand-mark">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="4" cy="4" r="2" fill="#fff" />
                <circle cx="12" cy="4" r="2" fill="#fff" opacity=".7" />
                <circle cx="4" cy="12" r="2" fill="#fff" opacity=".7" />
                <circle cx="12" cy="12" r="2" fill="#fff" />
                <path d="M4 4 L12 12 M12 4 L4 12" stroke="#fff" strokeWidth="1" opacity=".4" />
              </svg>
            </div>
            <div className="brand-text">
              <div className="t1">Synapse 가이드 매니저</div>
              <div className="t2">Workflow Guide · 105 docs · 5 weeks · 8 members</div>
            </div>
          </div>

          <div className="search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--mute)' }}>
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              ref={searchRef}
              placeholder="가이드 제목, 태그, 슬러그로 검색…   (예: kafka, e2e, 한국어, oauth)"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            <div className="search-meta mono">
              {filtered.length}/{GUIDES.length}
            </div>
            <span className="kbd mono">⌘K</span>
          </div>

          <div className="top-meta">
            <button className="reset-btn" onClick={() => clearAll()} disabled={!hasFilters}
                    title="모든 필터 삭제">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6a4 4 0 1 0 1.2-2.83M2 3v2.5H4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>초기화</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ========== Sidebar ========== */}
        <aside className="side">
          {/* Owners */}
          <div className="panel">
            <h3>담당자 <span className="count mono">{OWNERS.length}</span></h3>
            <div className="owner-list">
              {OWNERS.map(o => {
                const tot = ownerTotals[o.id];
                const on = selOwners.has(o.id);
                return (
                  <div key={o.id} className="owner-row" aria-pressed={on}
                    onClick={() => tOwner(o.id)}>
                    <span className="swatch" style={{ background: o.color }}></span>
                    <span>
                      <span className="lbl">{o.label}</span>
                      <span className="lbl-sub">{o.name}</span>
                    </span>
                    <span className="bar"><i style={{ width: `${(tot/ownerMax)*100}%`, background: o.color }}/></span>
                    <span className="num mono">{tot}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weeks */}
          <div className="panel">
            <h3>주차</h3>
            <div className="filter-row">
              {[1,2,3,4,5].map(w => {
                const n = GUIDES.filter(g => g.week === w).length;
                const on = selWeeks.has(w);
                return (
                  <button key={w} className="chip" aria-pressed={on} onClick={() => tWeek(w)}>
                    <span>W{w}</span><span className="n mono">{n}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Steps */}
          <div className="panel">
            <h3>스텝</h3>
            <div className="filter-row">
              {allSteps.map(s => {
                const n = GUIDES.filter(g => g.step === s).length;
                const on = selSteps.has(s);
                return (
                  <button key={s} className="chip" aria-pressed={on} onClick={() => tStep(s)}>
                    <span>Step {s}</span><span className="n mono">{n}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="panel">
            <h3>태그 <span className="count mono">{allTags.length}</span></h3>
            <div className="tag-cloud">
              {allTags.map(([t,c]) => {
                const on = selTags.has(t);
                return (
                  <button key={t} className="chip" aria-pressed={on} onClick={() => tTag(t)}>
                    <span>{t}</span><span className="n mono">{c}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ========== Content ========== */}
        <section className="stack">
          {/* Result list */}
          <div>
            <div className="results-head">
              <div className="left">
                <h2>가이드 목록</h2>
                <span className="n">{sorted.length}개 표시</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div className="seg">
                  <button aria-pressed={tweaks.layout==='list'} onClick={()=>setTweak('layout','list')}>리스트</button>
                  <button aria-pressed={tweaks.layout==='grid'} onClick={()=>setTweak('layout','grid')}>그리드</button>
                </div>
                <div className="seg">
                  <button aria-pressed={sortBy==='week'} onClick={()=>setSortBy('week')}>주차순</button>
                  <button aria-pressed={sortBy==='owner'} onClick={()=>setSortBy('owner')}>담당자순</button>
                  <button aria-pressed={sortBy==='title'} onClick={()=>setSortBy('title')}>제목순</button>
                </div>
              </div>
            </div>

            {hasFilters && (
              <div className="results-head" style={{ marginBottom: 10 }}>
                <div className="crumbs">
                  {q && <Crumb label={`검색: "${q}"`} onClear={()=>setQ('')} />}
                  {[...selOwners].map(id => {
                    const o = window.OWNER_BY_ID[id];
                    return <Crumb key={id} label={`담당: ${o.label}`} onClear={()=>tOwner(id)} />;
                  })}
                  {[...selWeeks].map(w => <Crumb key={w} label={`W${w}`} onClear={()=>tWeek(w)} />)}
                  {[...selSteps].map(s => <Crumb key={s} label={`Step ${s}`} onClear={()=>tStep(s)} />)}
                  {[...selTags].map(t => <Crumb key={t} label={`#${t}`} onClear={()=>tTag(t)} />)}
                  <span className="crumb clear-all" onClick={clearAll}>모두 지우기</span>
                </div>
              </div>
            )}

            {sorted.length === 0 ? (
              <div className="empty">
                <h4>일치하는 가이드가 없습니다</h4>
                <div>필터를 줄이거나 검색어를 다시 확인해 주세요.</div>
              </div>
            ) : tweaks.layout === 'grid' ? (
              <div className="grid-body">
                {sorted.slice(0, 300).map((g, i) => {
                  const o = window.OWNER_BY_ID[g.owner];
                  return (
                    <a key={i} className="grid-card" href={`viewer.html?u=${encodeURIComponent(g.url)}`}
                       style={{ '--owner-color': o.color }}>
                      <div className="grid-card-top">
                        <div className="id-tag">
                          <span className="w">W{g.week}</span>
                          <span>·</span>
                          <span className="s">S{g.step}</span>
                        </div>
                        <div className="owner-tag">
                          <span className="sw" style={{ background: o.color }}></span>
                          <span>{o.label}</span>
                        </div>
                      </div>
                      <div className="grid-card-title">{renderTitle(g.title)}</div>
                      <div className="grid-card-foot">
                        <div className="tags-cell">
                          {g.tags.slice(0, 3).map(t => (
                            <span key={t} className="tagchip">{t}</span>
                          ))}
                          {g.tags.length > 3 && <span className="tagchip">+{g.tags.length - 3}</span>}
                        </div>
                        <div className="open mono">
                          OPEN
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M3 3h4v4M7 3 3 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <>
                <div className="list-head">
                  <div className="mono">ID</div>
                  <div>담당자</div>
                  <div>가이드 제목</div>
                  <div className="col-tags">태그</div>
                  <div style={{ textAlign: 'right' }}>열기</div>
                </div>
                <div className="list-body">
                  {sorted.slice(0, 200).map((g, i) => {
                    const o = window.OWNER_BY_ID[g.owner];
                    return (
                      <a key={i} className="list-row" href={`viewer.html?u=${encodeURIComponent(g.url)}`}>
                        <div className="id-tag">
                          <span className="w">W{g.week}</span>
                          <span>·</span>
                          <span className="s">S{g.step}</span>
                        </div>
                        <div className="owner-cell">
                          <span className="sw" style={{ background: o.color }}></span>
                          <span>
                            <div className="ownt">{o.label}</div>
                            <div className="ownsub">{o.name}</div>
                          </span>
                        </div>
                        <div className="title-cell">
                          <div className="ttl">{renderTitle(g.title)}</div>
                        </div>
                        <div className="tags-cell">
                          {g.tags.slice(0, 4).map(t => (
                            <span key={t} className="tagchip">{t}</span>
                          ))}
                        </div>
                        <div className="open mono">
                          OPEN
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M3 3h4v4M7 3 3 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Footer note */}
          <div style={{ fontSize: 11, color: 'var(--mute)', textAlign: 'center', padding: '12px 0 32px' }}>
            데이터 출처 ·{' '}
            <a href="https://team-project-final.github.io/workflow-guide/" target="_blank" rel="noopener" style={{ borderBottom: '1px solid var(--rule)' }}>
              team-project-final.github.io/workflow-guide
            </a>
            {' · '}
            <span className="mono">{GUIDES.length} guides · 5 weeks · {OWNERS.length} owners</span>
          </div>
        </section>
      </main>

      {/* ========== Tweaks ========== */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="외관">
          <TweakRadio
            label="테마"
            value={tweaks.theme}
            options={[
              { value: 'light', label: '라이트' },
              { value: 'dark',  label: '다크' },
            ]}
            onChange={v => setTweak('theme', v)}
          />
          <TweakRadio
            label="밀도"
            value={tweaks.density}
            options={[
              { value: 'comfortable', label: '편안' },
              { value: 'compact',     label: '컴팩트' },
            ]}
            onChange={v => setTweak('density', v)}
          />
        </TweakSection>

        <TweakSection label="강조 색">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {ACCENT_OPTIONS.map(a => (
              <button
                key={a.id}
                onClick={() => setTweak('accent', a.id)}
                aria-pressed={tweaks.accent === a.id}
                title={a.label}
                style={{
                  height: 36, borderRadius: 8,
                  background: a.swatch,
                  border: tweaks.accent === a.id ? '2px solid var(--ink)' : '2px solid transparent',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px #00000020',
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--mute)', marginTop: 4 }}>
            현재: {(ACCENT_OPTIONS.find(a=>a.id===tweaks.accent)||{}).label}
          </div>
        </TweakSection>

        <TweakSection label="결과 표시">
          <TweakRadio
            label="레이아웃"
            value={tweaks.layout}
            options={[
              { value: 'list', label: '리스트' },
              { value: 'grid', label: '그리드' },
            ]}
            onChange={v => setTweak('layout', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function Crumb({ label, onClear }) {
  return (
    <span className="crumb">
      <span>{label}</span>
      <button className="x" onClick={onClear} aria-label="filter remove">×</button>
    </span>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
