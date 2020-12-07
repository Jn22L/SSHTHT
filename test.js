(() => {
  // 일반적인 setTimeout
  var i;
  for (i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log("기본적인 setTimeout", i);
    }, 100);
  }

  // 클로저를 사용하여 감싸준 setTimeout
  var j;
  for (j = 0; j < 10; j++) {
    (function (k) {
      setTimeout(function () {
        console.log("클로저 사용한 setTimeout", k);
      }, 1000);
    })(j);
  }
})();
