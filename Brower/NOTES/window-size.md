# Window Size

window는 브라우저의 현재 전역 객체로 브라우저에서 열려있는 전체적인 창을 의미한다.  
window안에는 DOM, BOM, JavaScript 객체들이 존재한다.

## window size 종류

> **viemport** : 화면 디스플레이상 표시 영역.

1. window.screen.width/window.scrren height : 사용자 모니터의 해상도.

2. window.outerwidth/window.outerHeight : Tab, URL를 포함한 전체적인 브라우저 사이즈.

3. window.innerWidth/window.innerHeight : 수직 스크롤바를 포함한 웹 페이지 전체적인 사이즈.

4. document.docuementElement.clientWidth/document.documentElement.clilentHeight  
:  수직 스크롤바를 제외한 웹 페이지 전체적인 사이즈.
