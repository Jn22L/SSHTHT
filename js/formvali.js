"use strinct";
(function () {
  const name = document.getElementById("name");
  const age = document.getElementById("age");
  const form = document.getElementById("form");
  const errorElement = document.getElementById("error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let messages = [];

    //   if (name.value === "" || name.value == null) { // input 태그 속성의 required 로 대체
    //     messages.push("이름을 입력해 주세요");
    //   }

    if (age.value.length < 2) {
      messages.push("나이는 2자 이상으로 입력해 주세요.");
    }

    if (messages.length > 0) {
      errorElement.innerText = messages.join(", ");
    } else {
      let form_data = { name: name.value, age: age.value };
      alert(JSON.stringify(form_data));
    }
  });
})();
