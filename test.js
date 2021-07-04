(() => {
  function handleClick(event) {
    function Person(name) {
      this.name = name;
    }

    var foo = new Person("Lee");

    // Person() 생성자 함수에 의해 생성된 객체를 생성한 객체는 Person() 생성자 함수이다.
    console.log(Person.prototype);
    console.log(Person.prototype.constructor === Person);

    // foo 객체를 생성한 객체는 Person() 생성자 함수이다.
    console.log(foo.constructor === Person);

    // Person() 생성자 함수를 생성한 객체는 Function() 생성자 함수이다.
    console.log(Person.constructor === Function);
  }

  function init() {
    const btnTest = document.querySelector("#btnTest");
    btnTest.addEventListener("click", handleClick);
  }

  init();
})();
