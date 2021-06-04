# Window Coordinates

브라우저 좌표는 수평축 X와 수직축 Y로 나누어지고 좌표는 좌측 상단으로 시작되어 나누어 진다.  
즉, (X : 0, Y : 0)으로 표기된다.

- X 축 : 수평축으로 오른쪽 이동할 수록 값이 점점 증가.
- Y 축 : 수직축으로 아래로 이동할 수록 값이 점점 증가.

## Element.getBoundingClientRect()

> **CSS - bottom/right VS JavaScript - bottom/right**  
>  
> JavaScript에서는 기준점이 좌측 상단이지만, 반면 CSS에서는 브라우저의 우측 하단을 시작점을 반영되는 차이점을 가지고 있다.

DOM에 있는 모든 요소들은 `getBoundingCilentReact()`를 함수를 사용할 수 있다.  
이 메서드는 요소의 사이즈, 위치와 관련된 다양항 정보들을 확인할 수 있다.

이때 위치는 포지션(position)의 top, right, bottom, left와 동일하다.

- top : 상단에서 부터 요소까지의 거리로 Y 좌표와 동일.

- left : 좌측에서 부터 요소까지의 거리로 X 좌표와 동일.
  
- bottom : 브라우저의 상단에서 요소 우측 하단 모서리의 좌표 Y 좌표.

- right : 요소의 우측 끝까지의 거리로 요소의 우측 하단 모서리의 X 좌표.

## client x, y VS page x, y

- client x, y : 스크롤이 보여지는 화면 기준으로 x, y 좌표 측정.
- page   x, y : 스크롤과 관계없이 잘린 요소들을 포함한 페이지 전체 기준으로 x, y 좌표 측정.
