"use strict";
(function () {
  const name = document.getElementById("name");
  const age = document.getElementById("age");
  const form = document.getElementById("form");
  const errorElement = document.getElementById("error");

  const progress = document.getElementById("progress");

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

  let i = 0;
  function count() {
    // 무거운 작업을 통째로 실행 -> 작업이 끝난후에 화면이 렌더링됨.
    // for (let i = 0; i < 1e6; i++) {
    //   i++;
    //   progress.innerHTML = i;
    // }

    // 무거운 작업을 쪼갠 후 이를 수행 -> 천단위로 작업을 끊음 -> 진행상태를 보여줄 수 있음 + 화면이 바로 뿌려짐.
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e5) {
      //count(); //
      setTimeout(count); // 지연시간 0 인 setTimeout 을 추가
    }
  }

  count();
})();
