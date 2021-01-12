(() => {
  function handleClick(event) {
    console.log("클릭", event);
    const divTest = document.querySelector("#divTest");
    var aaa = "var 는 함수내에서 전역적이다.";
    divTest.innerHTML = "클릭" + aaa;

    // generator: interface to write (함수이면서 함수와는 다르게 동작함)
    function* foo() {
      yield 1;
      yield 2;
      yield 3;
    }

    for (let i of foo()) {
      divTest.insertAdjacentHTML("beforeend", "for문" + i);
    }
  }

  function init() {
    const btnTest = document.querySelector("#btnTest");
    btnTest.addEventListener("click", handleClick);
  }

  init();
})();
