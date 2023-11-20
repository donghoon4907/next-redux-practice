## 프로젝트 개요 및 목적

우리인슈맨라이프 ERP 시스템을 구축하기 위한 프론트엔드 프로젝트입니다. Next 프레임워크 및 타입스크립트 기반으로 작성되었습니다.

## Getting Started

**개발 환경에서 실행**

```bash
npm run dev
```

**환경변수 구성**

-   dotenv를 사용, .env.example에서 변수 및 설명을 확인
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

-   redux action creator 및 관련된 인터페이스로 구성되어 있습니다.
-   각 action들은 `모델` 별로 구분되어 있습니다. 공통적으로 사용되는 모듈의 경우 common에서 관리하였습니다.
-   `모델`의 종류에는 tab과 modal 등과 같은 상태로 관리되는 UI 구성요소, contract(계약)와 hr(인사) 등 API 요청, error와 loading 등 공통으로 사용되는 상태관리 등이 있습니다.

**components**

-   UI를 구성하는 단일 기능을 가진 요소들로 구성되어 있습니다.
-   주로 사용되는 요소의 경우 My 전치사를 활용하였습니다.

**constants**

-   상수가 구성되어 있습니다.

**dto**

-   모델 별 DTO로 구성되어 있습니다.

**hooks**

-   사용자 정의 Hooks로 구성되어 있습니다.

**interfaces**

-   사용자 정의 인터페이스로 구성되어 있습니다.
-   공통적으로 사용되는 인터페이스는 `core.ts`에서 관리하였습니다.

**models**

-   API에서 사용되는 데이터를 모델화한 요소들로 구성되어 있습니다.

**pages**

-   페이지 컴포넌트로 구성되어 있습니다.
-   `_app, _document`: 모든 페이지에서 실행되는 기능을 담당하고 있습니다
-   `404, 500`: 없는 페이지 및 서버 오류 시 이동되는 페이지
-   `api`: 서버에서 실행해야될 api로 구성되어 있습니다

**partials**

-   두 가지 이상의 컴포넌트가 조합된 템플릿으로 구성되어 있습니다.

**reducers**

-   action을 관리하는 reducer들로 구성되어 있습니다. action과 동일한 방식으로 구분되어 있습니다.

**sagas**

-   비동기 action을 관리하는 saga들로 구성되어 있습니다. action과 동일한 방식으로 구분되어 있습니다.

**services**

-   실제 API를 호출하는 모듈로 구성되어 있습니다. 서버에서 실행해야 될 API의 경우 before 전치사를 활용하였습니다.

**static**

-   favicon, 로고 파일 등 정적 파일들로 구성되어 있습니다.

**store**

-   전역 상태를 관리하는 store를 생성하는 모듈입니다.

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
