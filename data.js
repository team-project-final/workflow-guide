// Synapse Workflow Guide — 105 guides
// Source: https://team-project-final.github.io/workflow-guide/

window.OWNERS = [
  { id: 'team-lead',          label: 'Team Lead',     name: '김민구', color: '#e85d75' },
  { id: 'platform-owner',     label: 'Platform',      name: '김해준', color: '#5b8def' },
  { id: 'engagement-owner',   label: 'Engagement',    name: '한승완', color: '#f29f3a' },
  { id: 'knowledge-owner-1',  label: 'Knowledge-1',   name: '김현지', color: '#7c5cff' },
  { id: 'knowledge-owner-2',  label: 'Knowledge-2',   name: '박은서', color: '#9b4dca' },
  { id: 'learning-card-owner',label: 'Learning Card', name: '조유지', color: '#22b8a6' },
  { id: 'learning-ai-owner',  label: 'Learning AI',   name: '김나경', color: '#3aa974' },
  { id: 'frontend-owner',     label: 'Frontend',      name: '전체',   color: '#d97a3d' },
];

const BASE = '.'; // gh-pages 같은 origin 배포 — 상대 경로

function g(week, step, owner, slug, title, tags) {
  return {
    week, step, owner, slug, title,
    tags: tags || [],
    url: `${BASE}/w${week}/step${step}/${owner}__${slug}-workflow-guide.html`,
  };
}

window.GUIDES = [
  // ============ Week 1 ============
  // Step 1 — 골격 / 초기 설정
  g(1, 1, 'engagement-owner',    'engagement-svc-spring-modulith-scaffold', 'engagement-svc 골격 생성', ['scaffold','spring','modulith']),
  g(1, 1, 'frontend-owner',      'frontend-flutter-scaffold',               'Flutter 프로젝트 기본 구조 생성', ['scaffold','flutter']),
  g(1, 1, 'knowledge-owner-1',   'knowledge-svc-spring-modulith-scaffold',  'knowledge-svc 골격 생성', ['scaffold','spring','modulith']),
  g(1, 1, 'knowledge-owner-2',   'modulith',                                'Modulith 모듈 구조 설정', ['scaffold','modulith']),
  g(1, 1, 'learning-ai-owner',   'learning-ai-fastapi-scaffold',            'FastAPI 프로젝트 초기 설정', ['scaffold','fastapi','python']),
  g(1, 1, 'learning-card-owner', 'learning-card-spring-modulith-scaffold',  'learning-card 프로젝트 초기 설정', ['scaffold','spring','modulith']),
  g(1, 1, 'platform-owner',      'platform-svc-spring-modulith-scaffold',   'platform-svc 골격 생성', ['scaffold','spring','modulith']),
  g(1, 1, 'team-lead',           'aws-infra-provisioning',                  'AWS 인프라 프로비저닝', ['infra','aws']),
  // Step 2 — 핵심 도메인 CRUD
  g(1, 2, 'engagement-owner',    'community-group-crud',                    'W1 Step 2 - community 그룹 CRUD', ['community','crud']),
  g(1, 2, 'frontend-owner',      'oauth-login-signup',                      'W1 Step 2 - 로그인/회원가입 화면 및 OAuth 인증', ['auth','oauth','ui']),
  g(1, 2, 'knowledge-owner-1',   'note-markdown-crud',                      'W1 Step 2 - note Markdown CRUD', ['note','crud','markdown']),
  g(1, 2, 'knowledge-owner-2',   'archunit-module-boundary-test',           'W1 Step 2 - ArchUnit 모듈 경계 테스트', ['test','archunit']),
  g(1, 2, 'learning-ai-owner',   'claude-api-integration',                  'W1 Step 2 - Claude API 연동', ['ai','llm','claude']),
  g(1, 2, 'learning-card-owner', 'deck-card-crud-api',                      'W1 Step 2 - 덱/카드 CRUD API', ['card','crud']),
  g(1, 2, 'platform-owner',      'oauth-signup-login',                      'W1 Step 2 - OAuth 회원가입/로그인', ['auth','oauth']),
  g(1, 2, 'team-lead',           'docker-compose-four-services',            'W1 Step 2 - Docker Compose 4-서비스 구성', ['infra','docker']),
  // Step 3 — 보강
  g(1, 3, 'engagement-owner',    'community-member-management',             'W1 Step 3 - community 멤버 관리', ['community']),
  g(1, 3, 'frontend-owner',      'dashboard-sidebar-navigation',            'W1 Step 3 - 대시보드 및 사이드바 네비게이션', ['ui','navigation']),
  g(1, 3, 'knowledge-owner-1',   'note-wikilink-parsing',                   'W1 Step 3 - note 위키링크 파싱', ['note','parsing']),
  g(1, 3, 'knowledge-owner-2',   'avro-schema-registry-compatibility',      'W1 Step 3 - Avro 스키마 등록 및 호환성 검증', ['avro','kafka','schema']),
  g(1, 3, 'learning-ai-owner',   'embedding-api-integration',               'W1 Step 3 - Embedding API 연동', ['ai','embedding']),
  g(1, 3, 'learning-card-owner', 'sm2-algorithm',                           'W1 Step 3 - SM-2 알고리즘 구현', ['card','algorithm','srs']),
  g(1, 3, 'platform-owner',      'jwt-mfa-foundation',                      'W1 Step 3 - JWT + MFA 기초', ['auth','jwt','mfa']),
  g(1, 3, 'team-lead',           'cicd-pipeline',                           'W1 Step 3 - CI/CD 파이프라인 구성', ['infra','cicd']),

  // ============ Week 2 ============
  // Step 4
  g(2, 4, 'engagement-owner',    'gamification-xp-events-query',                  'W2 Step 4 - gamification XP 기초 — xp_events 기록 + XP 조회', ['gamification','xp']),
  g(2, 4, 'frontend-owner',      'note-editor-markdown-preview-save',             'W2 Step 4 - 노트 에디터 화면 — Markdown 편집 + 미리보기 + 저장', ['ui','note','markdown']),
  g(2, 4, 'knowledge-owner-1',   'graph-backlink-d3-data-api',                    'W2 Step 4 - graph 모듈 — 백링크 + D3.js 데이터 API', ['note','graph','d3']),
  g(2, 4, 'knowledge-owner-2',   'chunking-async-split',                          'W2 Step 4 - chunking 모듈 — 비동기 청크 분할', ['chunking','async']),
  g(2, 4, 'learning-ai-owner',   'semantic-search-pgvector-cosine',               'W2 Step 4 - 시맨틱 검색 골격 — pgvector 임베딩 저장/조회 + 코사인 유사도 검색', ['search','pgvector','semantic']),
  g(2, 4, 'learning-card-owner', 'srs-review-session-complete',                   'W2 Step 4 - SRS 복습 세션 완성 — 오늘 복습 카드 큐 + rating → SM-2 → 다음 복습일', ['card','srs','review']),
  g(2, 4, 'platform-owner',      'billing-stripe-checkout-webhook-plan',          'W2 Step 4 - billing 모듈 — Stripe Checkout + Webhook + 플랜 관리', ['billing','stripe']),
  g(2, 4, 'team-lead',           'kafka-topic-design-creation',                   'W2 Step 4 - Kafka 토픽 설계 + 생성', ['kafka','infra']),
  // Step 5
  g(2, 5, 'engagement-owner',    'community-share-token-search-copy',             'W2 Step 5 - community 공유 — share_token + 공유 콘텐츠 검색/복사', ['community','share']),
  g(2, 5, 'frontend-owner',      'srs-review-screen',                             'W2 Step 5 - SRS 복습 화면 — 카드 제시 → 뒤집기 → 난이도 선택 → 다음 카드', ['ui','srs','card']),
  g(2, 5, 'knowledge-owner-1',   'note-kafka-elasticsearch-indexing',             'W2 Step 5 - ES 동기화 — 노트 변경 → Kafka → Elasticsearch 인덱싱', ['note','kafka','search']),
  g(2, 5, 'knowledge-owner-2',   'bm25-nori-search',                              'W2 Step 5 - 검색 BM25 통합 — ES nori 기반 한국어 검색', ['search','bm25','korean']),
  g(2, 5, 'learning-ai-owner',   'ai-card-generation-skeleton',                   'W2 Step 5 - AI 카드 자동 생성 골격 — Note → LLM → Card 목록 생성', ['ai','card','llm']),
  g(2, 5, 'learning-card-owner', 'card-reviewed-kafka-avro-event',                'W2 Step 5 - card.reviewed Kafka 발행 — Avro 스키마 + 이벤트 발행', ['kafka','avro','card']),
  g(2, 5, 'platform-owner',      'notification-fcm-device-tokens',                'W2 Step 5 - notification 모듈 기초 — FCM 설정 + device_tokens', ['notification','fcm']),
  g(2, 5, 'team-lead',           'schema-registry-backward-compatibility',        'W2 Step 5 - Schema Registry BACKWARD 호환성 강제', ['kafka','schema']),
  // Step 6
  g(2, 6, 'frontend-owner',      'community-group-list-detail',                   'W2 Step 6 - 커뮤니티 그룹 목록/상세 화면', ['ui','community']),
  g(2, 6, 'learning-card-owner', 'review-session-statistics-api',                 'W2 Step 6 - review_sessions 통계 — 일별/주별 복습 수, 정답률 API', ['card','stats']),
  g(2, 6, 'team-lead',           'gateway-routing',                               'W2 Step 6 - Gateway 라우팅', ['infra','gateway']),

  // ============ Week 3 ============
  // Step 6
  g(3, 6, 'engagement-owner',    'gamification-badge-level-streak-leaderboard',   'W3 Step 6 - gamification 완성 — 배지 수여 + 레벨 시스템 + 스트릭 추적 + 리더보드', ['gamification','badge']),
  g(3, 6, 'knowledge-owner-1',   'note-version-history-save-query-restore',       'W3 Step 6 - note 버전 이력 — 수정 히스토리 저장/조회/복원', ['note','version']),
  g(3, 6, 'knowledge-owner-2',   'search-rrf-semantic-bm25-hybrid',               'W3 Step 6 - 검색 RRF — 시맨틱(pgvector) + BM25(ES) 결합 하이브리드 검색', ['search','hybrid','rrf']),
  g(3, 6, 'learning-ai-owner',   'ai-card-note-created-kafka-llm-learning-card-api','W3 Step 6 - AI 카드 자동 생성 — note.created Kafka 소비 → LLM → Card 생성 → learning-card API 호출', ['ai','kafka','card','llm']),
  g(3, 6, 'platform-owner',      'audit-module-kafka-consumer-audit-logs',        'W3 Step 6 - audit 모듈 — Kafka 이벤트 소비 → audit_logs 적재', ['audit','kafka']),
  // Step 7
  g(3, 7, 'engagement-owner',    'gamification-kafka-levelup-badgeearned-event',  'W3 Step 7 - Kafka 연동 — gamification.level_up / gamification.badge_earned 이벤트 발행', ['gamification','kafka']),
  g(3, 7, 'frontend-owner',      'gamification-ui-xp-badge-level-animation',      'W3 Step 7 - 게이미피케이션 UI — XP 바 + 배지 갤러리 + 레벨 표시 + 레벨업 축하 애니메이션', ['ui','gamification','animation']),
  g(3, 7, 'knowledge-owner-1',   'tag-management-filter-autocomplete-popular',    'W3 Step 7 - 태그 관리 고도화 — 태그 기반 필터링, 태그 자동완성, 인기 태그', ['note','tag']),
  g(3, 7, 'knowledge-owner-2',   'search-quality-test-query-report',              'W3 Step 7 - 검색 정확도 측정 — 테스트 쿼리 세트 → 정확도 리포트', ['search','quality','test']),
  g(3, 7, 'learning-ai-owner',   'rag-qa-chunk-search-llm-semantic-cache',        'W3 Step 7 - RAG Q&A (시간 허용 시) — 관련 청크 검색 → LLM 답변 생성 + 시맨틱 캐시', ['ai','rag','llm']),
  g(3, 7, 'learning-card-owner', 'card-review-due-scheduler-kafka-event',         'W3 Step 7 - card.review.due 발행 — 매일 스케줄러 → 복습 대상 사용자 → Kafka 발행', ['card','kafka','scheduler']),
  g(3, 7, 'platform-owner',      'notification-kafka-fcm-ses-email',              'W3 Step 7 - notification Kafka 연동 — 이벤트 소비 → FCM 푸시 + SES 이메일 발송', ['notification','kafka','email']),
  g(3, 7, 'team-lead',           'full-integration-test-coordination',            'W3 Step 7 - 전체 통합 테스트 조율', ['test','integration']),
  // Step 8
  g(3, 8, 'engagement-owner',    'community-report-admin-moderation-api',         'W3 Step 8 - community 신고 + Admin 모더레이션 — 신고 접수/처리 API', ['community','moderation']),
  g(3, 8, 'frontend-owner',      'notification-center-list-read-settings',        'W3 Step 8 - 알림 센터 — 알림 목록 + 읽음/안읽음 + 설정', ['ui','notification']),
  g(3, 8, 'learning-card-owner', 'review-statistics-dashboard-streak-api',        'W3 Step 8 - 복습 통계 대시보드 — 일별/주별 복습 수, 정답률, 스트릭 통합 API', ['card','stats']),
  g(3, 8, 'platform-owner',      'tenant-user-admin-management-api',              'W3 Step 8 - 테넌트/사용자 관리 API — 관리자 사용자 목록/검색/정지/삭제', ['admin','tenant']),
  g(3, 8, 'team-lead',           'argocd-dev-staging-deployment-verification',    'W3 Step 8 - ArgoCD dev/staging 배포 검증', ['infra','argocd','deploy']),
  // Step 9
  g(3, 9, 'frontend-owner',      'admin-report-list-moderation-screen',           'W3 Step 9 - 관리자 화면 — 신고 목록 + 처리(승인/거부)', ['ui','admin','moderation']),
  // Step 10
  g(3, 10,'frontend-owner',      'shared-deck-explore-detail-copy-screen',        'W3 Step 10 - 공유 덱 탐색/상세 — 공유 콘텐츠 목록 + 복사 버튼', ['ui','share','card']),

  // ============ Week 4 ============
  // Step 8
  g(4, 8, 'knowledge-owner-1',   'note-graph-e2e-test',                           'W4 Step 8 - 노트/그래프 E2E 테스트', ['test','e2e','note']),
  g(4, 8, 'knowledge-owner-2',   'search-e2e-test-quality-report',                'W4 Step 8 - 검색 E2E 테스트 + 정확도 리포트', ['test','e2e','search']),
  g(4, 8, 'learning-ai-owner',   'ai-card-generation-e2e-test',                   'W4 Step 8 - AI 카드 자동 생성 E2E 테스트', ['test','e2e','ai','card']),
  // Step 9
  g(4, 9, 'engagement-owner',    'gamification-e2e-test',                         'W4 Step 9 - 게이미피케이션 E2E 테스트', ['test','e2e','gamification']),
  g(4, 9, 'knowledge-owner-1',   'bugfix-es-sync-stabilization',                  'W4 Step 9 - 버그 수정 + ES 동기화 안정화', ['bugfix','search']),
  g(4, 9, 'knowledge-owner-2',   'search-tuning-bugfix',                          'W4 Step 9 - 검색 튜닝 + 버그 수정', ['bugfix','search']),
  g(4, 9, 'learning-ai-owner',   'semantic-search-quality-bugfix',                'W4 Step 9 - 시맨틱 검색 정확도 검증 + 버그 수정', ['bugfix','search','ai']),
  g(4, 9, 'learning-card-owner', 'review-e2e-test',                               'W4 Step 9 - 복습 E2E 테스트', ['test','e2e','card']),
  g(4, 9, 'platform-owner',      'auth-billing-e2e-test',                         'W4 Step 9 - 인증/결제 E2E 테스트', ['test','e2e','auth','billing']),
  g(4, 9, 'team-lead',           'full-e2e-scenario-test-coordination',           'W4 Step 9 - 전체 E2E 시나리오 정의 + 테스트 실행 조율', ['test','e2e']),
  // Step 10
  g(4, 10,'engagement-owner',    'community-e2e-test-bugfix',                     'W4 Step 10 - 커뮤니티 E2E 테스트 + 버그 수정', ['test','e2e','community','bugfix']),
  g(4, 10,'learning-card-owner', 'bugfix-kafka-event-stabilization',              'W4 Step 10 - 버그 수정 + Kafka 이벤트 안정화', ['bugfix','kafka']),
  g(4, 10,'platform-owner',      'bugfix-notification-stabilization',             'W4 Step 10 - 버그 수정 + 알림 안정화', ['bugfix','notification']),
  g(4, 10,'team-lead',           'performance-sla-verification',                  'W4 Step 10 - 성능 SLA 검증', ['performance','sla']),
  // Step 11
  g(4, 11,'frontend-owner',      'responsive-screen-verification',                'W4 Step 11 - 전체 화면 반응형 검증', ['ui','responsive']),
  g(4, 11,'team-lead',           'staging-deploy-monitoring-dashboard',           'W4 Step 11 - Staging 배포 + 모니터링 대시보드 가동', ['deploy','monitoring']),
  // Step 12
  g(4, 12,'frontend-owner',      'error-loading-state-consistency',               'W4 Step 12 - 에러/로딩 상태 일관성 검증', ['ui','quality']),
  // Step 13
  g(4, 13,'frontend-owner',      'design-token-consistency',                      'W4 Step 13 - DESIGN.md 토큰 일관성 검증', ['ui','design']),

  // ============ Week 5 ============
  // Step 1 — unit test hardening (x8)
  g(5, 1, 'engagement-owner',    'unit-test-hardening', 'W5 Step 1 - 단위 테스트 보강 — 핵심 도메인/서비스 로직 검증', ['test','unit']),
  g(5, 1, 'frontend-owner',      'unit-test-hardening', 'W5 Step 1 - 단위 테스트 보강 — 핵심 도메인/서비스 로직 검증', ['test','unit']),
  g(5, 1, 'knowledge-owner-1',   'unit-test-hardening', 'W5 Step 1 - 단위 테스트 보강 — 핵심 도메인/서비스 로직 검증', ['test','unit']),
  g(5, 1, 'knowledge-owner-2',   'unit-test-hardening', 'W5 Step 1 - 단위 테스트 보강 — 핵심 도메인/서비스 로직 검증', ['test','unit']),
  g(5, 1, 'learning-ai-owner',   'unit-test-hardening', 'W5 Step 1 - 단위 테스트 보강 — 핵심 도메인/서비스 로직 검증', ['test','unit']),
  g(5, 1, 'learning-card-owner', 'unit-test-hardening', 'W5 Step 1 - 단위 테스트 보강 — 핵심 도메인/서비스 로직 검증', ['test','unit']),
  g(5, 1, 'platform-owner',      'unit-test-hardening', 'W5 Step 1 - 단위 테스트 보강 — 핵심 도메인/서비스 로직 검증', ['test','unit']),
  g(5, 1, 'team-lead',           'unit-test-hardening', 'W5 Step 1 - 단위 테스트 보강 — 핵심 도메인/서비스 로직 검증', ['test','unit']),
  // Step 2 — service integration test (x8)
  g(5, 2, 'engagement-owner',    'service-integration-test', 'W5 Step 2 - 서비스 통합 테스트 — API/DB/Kafka/외부 연동 검증', ['test','integration']),
  g(5, 2, 'frontend-owner',      'service-integration-test', 'W5 Step 2 - 서비스 통합 테스트 — API/DB/Kafka/외부 연동 검증', ['test','integration']),
  g(5, 2, 'knowledge-owner-1',   'service-integration-test', 'W5 Step 2 - 서비스 통합 테스트 — API/DB/Kafka/외부 연동 검증', ['test','integration']),
  g(5, 2, 'knowledge-owner-2',   'service-integration-test', 'W5 Step 2 - 서비스 통합 테스트 — API/DB/Kafka/외부 연동 검증', ['test','integration']),
  g(5, 2, 'learning-ai-owner',   'service-integration-test', 'W5 Step 2 - 서비스 통합 테스트 — API/DB/Kafka/외부 연동 검증', ['test','integration']),
  g(5, 2, 'learning-card-owner', 'service-integration-test', 'W5 Step 2 - 서비스 통합 테스트 — API/DB/Kafka/외부 연동 검증', ['test','integration']),
  g(5, 2, 'platform-owner',      'service-integration-test', 'W5 Step 2 - 서비스 통합 테스트 — API/DB/Kafka/외부 연동 검증', ['test','integration']),
  g(5, 2, 'team-lead',           'service-integration-test', 'W5 Step 2 - 서비스 통합 테스트 — API/DB/Kafka/외부 연동 검증', ['test','integration']),
  // Step 3 — full regression / E2E (x8)
  g(5, 3, 'engagement-owner',    'full-regression-e2e-release-verification', 'W5 Step 3 - 전체 회귀/E2E 테스트 — 릴리즈 후보 검증', ['test','e2e','release']),
  g(5, 3, 'frontend-owner',      'full-regression-e2e-release-verification', 'W5 Step 3 - 전체 회귀/E2E 테스트 — 릴리즈 후보 검증', ['test','e2e','release']),
  g(5, 3, 'knowledge-owner-1',   'full-regression-e2e-release-verification', 'W5 Step 3 - 전체 회귀/E2E 테스트 — 릴리즈 후보 검증', ['test','e2e','release']),
  g(5, 3, 'knowledge-owner-2',   'full-regression-e2e-release-verification', 'W5 Step 3 - 전체 회귀/E2E 테스트 — 릴리즈 후보 검증', ['test','e2e','release']),
  g(5, 3, 'learning-ai-owner',   'full-regression-e2e-release-verification', 'W5 Step 3 - 전체 회귀/E2E 테스트 — 릴리즈 후보 검증', ['test','e2e','release']),
  g(5, 3, 'learning-card-owner', 'full-regression-e2e-release-verification', 'W5 Step 3 - 전체 회귀/E2E 테스트 — 릴리즈 후보 검증', ['test','e2e','release']),
  g(5, 3, 'platform-owner',      'full-regression-e2e-release-verification', 'W5 Step 3 - 전체 회귀/E2E 테스트 — 릴리즈 후보 검증', ['test','e2e','release']),
  g(5, 3, 'team-lead',           'full-regression-e2e-release-verification', 'W5 Step 3 - 전체 회귀/E2E 테스트 — 릴리즈 후보 검증', ['test','e2e','release']),
];

// Owner lookup helpers
window.OWNER_BY_ID = Object.fromEntries(window.OWNERS.map(o => [o.id, o]));
