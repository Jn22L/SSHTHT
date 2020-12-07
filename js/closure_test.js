(() => {
  const app = document.querySelector("#app");
  const hookTest = document.querySelector("#hookTest");

  // 클로저를 사용하여 리액트 hook 처럼 만들어 보기
  const React = (function () {
    let _val;
    function useState(initVal) {
      let state = _val || initVal;
      const setState = (newVal) => {
        _val = newVal;
      };
      return [state, setState];
    }
    return { useState };
  })();

  const hookTestFunc = () => {
    const [count, setCount] = React.useState(1);
    console.log(count); // 1
    setCount(2);
    console.log(count); // 1 (?)
  };

  hookTest.addEventListener("click", hookTestFunc);

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
})();
