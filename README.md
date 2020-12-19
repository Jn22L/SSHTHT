# 심심할땐 자바스크립트랑 놀기, 바닥부터 한땀한땀

- 화면 : <https://jn22l.github.io/sshtht>

## 2020-12-19 백엔드를 스프링부트로 변경

- github : <https://github.com/Jn22L/sshtht-springboot-mariadb>
- heroku : <https://sshtht-springboot-mariadb.herokuapp.com/board/select>

## 2020-12-07

- index.js 다시 jquery 로 변경 - 여기저기 빨간색 에러나서 일단 바꿈
- index.js 소스정리 심플하게
- 클로저 기본 익힘 - 나중에 천천히 다져보자

## 2020-12-06

- 메뉴클릭시 이동을 위하여 jquery 사용하던것을 걷어냄
- fetch + pushstate 로 ajax 및 history 구현 [참조](https://poiemaweb.com/js-spa)
- 페이지는 가져왔으나, innerHTML -> SCRIPT 실행안된 문제발생
  - 스크립트 실행가능하도록 구글링 -> 함수추가 해결!
- 그러나, 로컬에서 잘 되었으나 github 에서는 CSP 관련 에러발생
- [CSP 설정 에러해결](https://developers.google.com/web/fundamentals/security/csp?hl=ko)
- 할일 클릭시 todolist.js 의 경로에 sshtht 누락되어 못불러오는 문제발생
- 이것저것 해보다가 다시 jquery 로 돌아옴 아효 진짜
- 일단 jquery가 아닌 js로 대략 라우팅 맛봤다는것에 만족하고 그냥 당분간 jquery 로 가자( 정신건강을 위하여 )
- 누군가 더 좋은걸 만들면 그걸 가져다가 감사하게 사용하자. 그럼 오늘의 삽질 끝!

## 2020-12-06 저녁 잘못된것 찾아냄. pushState 에 상대경로로 넣으면 모든게 해결!

- 절대경로로 설정하여 github 올림
  - `history.pushState('','',"/nave__todo")`
  - 절대경로 올렸을때 할일 url : https://jn22l.github.io/nav__todo
  - 절대경로 올렸을때 할일 js : https://jn22l.github.io/js/todolist.js -> 계속 못찾음
  - js 를 찾을 수 있도록 강제로 my-simsim-site 를 넣어보는 삽질을 함. -> 어쨋든 나옴
  - 이때 주소창에 sshtht 가 없는것을 발견 .. 아
- 상대경로로 pushState 설정하여 github 올림
  - `history.pushState('','',"./nave__todo")`
  - 상대경로 올렸을때 할일 url : https://jn22l.github.io/sshtht/nav__home
  - 상대경로 올렸을때 할일 js : https://jn22l.github.io/sshtht/todolist.js -> 잘찾음!!! 어휴ㅎ
