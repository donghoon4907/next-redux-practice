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

**redux-devtools**

-   전역 상태 변경 로그를 추적할 수 있습니다. 프로젝트 내에서 개발환경 한정으로 해당 미들웨어를 추가해 놓았습니다.
-   (redux-devtools)[https://github.com/reduxjs/redux-devtools]

**eslint+prettier**

-   소스 코드를 일관된 스타일로 작성할 수 있도록 사용하였습니다. Vscode를 사용하는 경우 확장 프로그램을 설치하세요.
