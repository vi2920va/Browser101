# Window Load, aysnc/defer

## &lt;head&gt; 요소 내에 &lt;script&gt; 요소를 삽입할 경우

### 1. head

```html
<head>
  <script src="index.js"></script>
</head>
```

**로드 순서**  
HTML 파싱(parsing) → `<head>` 요소 내에서 `<script>` 요소를 발견 → HTML 파싱 중단 → JavaScript 패칭(patching) → JavaScript 실행 → 다시 HTML 파싱

**장단점**  
위의 로드 순서대로 JS파일이 크거나, 인터넷이 느릴 경우 사용자가 웹 페이지를 보는데 까지 오래 시간 소요된다는 단점이 존재.

### 2. head + async

```html
<head>
  <script async src="indexA.js"></script>
  <script async src="indexB.js"></script>
  <script async src="indexC.js"></script>
</head>
```

**로드 순서**  
HTML 파싱(parsing) →  HTML 파싱 중단 → JavaScript 패칭(patching) → JavaScript 실행  

`async` 속성을 써서 여러 개의 JavaScript 파일을 수행할 경우, 패칭은 병렬도 되지만 실행은 패칭이 완료된 순서대로 실행되므로 수행의 파악의 어려움이 있다.

**장단점**  
장점 : JavaScript 패칭과 HTML 파싱이 병렬적으로 일어나서 다운로드 시간을 단축 시킨다.  
단점 : JavaScript가 HTML이 모두 파싱되기도 전에 실행되므로 JavaScript에서 특정 요소를 조작한다고 할 때, 조작하려는 시점에 해당 HTML 요소가 정의되지 있지 않을 수 있어서 위험하다.

### 3. head + defer

```html
<head>
  <script defer src="indexA.js"></script>
  <script defer src="indexB.js"></script>
  <script defer src="indexC.js"></script>
</head>
```

**로드 순서**  
HTML 모두 다 파싱(parsing) →  패칭된 JavaScript 파일 실행 → JavaScript 패칭

`defer` 속성을 쓰면 HTML 파싱과 JavaScript 패칭이 병렬로 수행되어서 여러 JavaScript 파일을 수행할 경우, 패칭은 병렬로 동시에 일어나고 실행 순서는 절차적으로 위에서 아래로 수행하게 된다.

**장단점**  
장점 : HTML 파싱과 JavaScript 패칭을 병렬로 수행한 후 마지막에 JavaScript 파일을 실행.

## 2. &lt;body&gt; 요소 내에 &lt;script&gt; 요소를 삽입

```html
<body>
  <script src="index.js"></script>
</body>
```

**로드 순서**  
`<body>`끝까지 HTML 파싱(parsing) → JavaScript 파일 발견 → JavaScript 패칭  → JavaScript 실행

**장단점**  
장점 : HTML 컨텐츠를 빠르게 본다는 장점이 존재.  
단점 : 의미있는 컨텐츠가 JavaScript에 의존적이면 사용자가 기다려야 한다.

## load와 관련 JavaScript 이벤트

### 1. DOMContentLoaded

`DOMContentLoaded` 이벤트는 document 객체에 발생. 즉, HTML이 전부 완료되면 실행.

```js
window.addEventListener("DOMContentLoaded", () => {});
```

### 2. load

`load` 이벤트 문서의 모든 콘텐츠(image, css, script, etc)가 모두 로드되었을 때 실행.

```js
window.addEventListener("load", () => {});
```

### 3. beforeunload

사용자가 현재 페이지를 떠나 다른 페이지로 이동하려고 할 때나 창을 닫으려고 할 때 `beforeunload` 핸들러에서 추가 확인 요청.

```js
window.addEventListener("beforeunload", () => {});
```

### 4. unload

사용자가 웹 페이지를 떠날 때 즉, 문서를 완전히 닫을 때 실행한다. 즉, `unload` 이벤트는 팝업창을 닫거나 딜레이 없는 작업을 수행할 수 있다.

```js
window.addEventListener("unload", () => {});
```
