(() => {
  const app = document.querySelector("#app");

  // 일반적인 setTimeout
  var i;
  for (i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log("기본적인 setTimeout", i);
      app.innerHTML = app.innerHTML + "기본적인 setTimeout : " + i + "<br>";
    }, 500);
  }

  // 클로저를 사용하여 감싸준 setTimeout
  var j;
  for (j = 0; j < 5; j++) {
    (function (k) {
      setTimeout(function () {
        console.log("클로저 사용한 setTimeout", k);
        app.innerHTML =
          app.innerHTML + "클로저 사용한 setTimeout : " + k + "<br>";
      }, 1000);
    })(j);
  }

  console.log("출력", ret.join(", "));
  app.innerHTML = "왜 안찍히지";
})();
