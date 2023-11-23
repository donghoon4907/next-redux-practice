해당 프로젝트는 Next 12 및 타입스크립트 기반으로 작성

## Getting Started

**개발 환경에서 실행**

```bash
npm run dev
```

**환경변수 구성**

-   .env.example에서 사용되는 변수 및 설명을 보고 아래처럼 설정
-   `개발환경`: .env.development
-   `운영환경`: .env.production

**빌드**

```bash
npm run build
```

**프로젝트 실행**

```bash
npm run start
```

## 프로젝트 구조

**actions**

-   사용자 액션 생성 함수 및 인터페이스

**components**

-   UI를 구성하는 단일 기능을 가진 컴포넌트

**constants**

-   상수
-   `core.ts`: 공통 상수

**dto**

-   모델 별 DTO

**hooks**

-   사용자 정의 Hooks

**interfaces**

-   사용자 정의 인터페이스
-   `core.ts`: 공통 인터페이스

**models**

-   데이터 모델

**pages**

-   페이지 컴포넌트

**partials**

-   두 가지 이상의 컴포넌트가 조합된 템플릿

**reducers**

-   전역 상태 업데이트

**sagas**

-   비동기 액션 관리

**services**

-   API 호출

**static**

-   favicon, 로고 파일 등 정적 파일

**store**

-   전역 상태 관리

**styles**

-   스타일시트 목록

**utils**

-   유틸 모듈 목록

## 확장 프로그램

## 참조

-   [가이드 문서](https://docs.google.com/spreadsheets/d/1gjfNiE-p-m4lWFO5tvC9xn4mHJ-yHSfxO6MmF46QDuc/edit#gid=0)
