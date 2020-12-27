# 심심할땐 자바스크립트랑 놀기, 바닥부터 한땀한땀

- 화면 : <https://jn22l.github.io/sshtht>

## 2020-12-27 구글 OAuth2.0 연동하여, 사용자정보 및 캘린더 정보 가져오기

0. 구글 클라이언트 ID / SECRET 얻기 + SCOPE 설정

- 구글 cloud console > API 및 서비스
- https://console.cloud.google.com/

1. 구글 인증페이지 이동(GET) 만들기

2. 인증페이지에서 인증되면, code 값이 리다이렉트 되는 url(GET)

3. 2번에서 받은 code 값으로 access_token 얻기(POST)

4. access_token 으로 사용자정보 가져오기(GET)

5. access_token 만료시 refresh_token 으로 access_token 얻기(POST)


## 2020-12-21 hikariCP 설정추가

- Heroku MariaDB 에서 max_user_connections 에러발생
- addon 에서 db password reset 해주면 일단 해결은 됨
- 접속자도 없는데 계속 커넥션이 풀나는게 좀 이상함
- 일단 스프링부트에 hikariCP 관련 설정 2줄 추가해봄
  - spring.datasource.hikari.maxLifetime=600000
  - spring.datasource.hikari.maximumPoolSize=9

## 2020-12-20 DB저장/삭제 기능추가

- DB저장 / 삭제기능 추가
- heroku 배포했으나, select시 계속 에러발생
  - application Java 에 루트 / 추가하여 배포하니 작동함
  - 아마도 캐쉬 때문??

## 2020-12-19 백엔드를 스프링부트로 변경 및 Heroku 배포

- github : <https://github.com/Jn22L/sshtht-springboot-mariadb>
- heroku : <https://sshtht-springboot-mariadb.herokuapp.com/board/selectall>

## 2020-12-07

- index.js 다시 jquery 로 변경 - 여기저기 빨간색 에러나서 일단 바꿈
- index.js 소스정리 심플하게
- 클로저 기본 익힘 - 나중에 천천히 다져보자

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
