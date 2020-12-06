# 심심할땐 순수 바닐라 JS 로 웹사이트 만들면서 놀기, 바닥부터 한땀한땀

화면 : <https://jn22l.github.io/my-simsim-site/>

# 2020-12-06
* 메뉴클릭시 이동을 위하여 jquery 사용하던것을 걷어냄
* fetch + pushstate 로 ajax 및 history 구현 [참조: <https://poiemaweb.com/js-spa>]
* 페이지는 가져왔으나, innerHTML -> SCRIPT 실행안된 문제발생
  * 스크립트 실행가능하도록 구글링 -> 함수추가 해결!
* 그러나, 로컬에서 잘 되었으나 github 에서는 에러발생 ...
* github 에서 CSP 설정 어쩌구 에러발생 ... <https://developers.google.com/web/fundamentals/security/csp?hl=ko>
* 이것저것 해보다가 다시 jquery 로 돌아옴 아효 진짜
* 일단 jquery가 아닌 js로 대략 라우팅 맛봤다는것에 만족하고 그냥 당분간 jquery 로 가자( 정신건강을 위하여 )
* 누군가 더 좋은걸 만들면 그걸 가져다가 감사하게 사용하자. 그럼 오늘의 삽질 끝!
