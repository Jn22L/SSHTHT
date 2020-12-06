const name = document.getElementById("name");
const password = document.getElementById("password");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let messages = [];

  //   if (name.value === "" || name.value == null) { // input 태그 속성의 required 로 대체
  //     messages.push("이름을 입력해 주세요");
  //   }

  if (password.value.length < 6) {
    messages.push("패스워드는 6자 이상으로 입력해 주세요");
  }

  if (password.value.length > 20) {
    messages.push("패스워드는 20자 이하로 입력해 주세요");
  }

  if (password.value === "password") {
    messages.push("password 는 패스워드로 불가합니다");
  }

  if (messages.length > 0) {
    //e.preventDefault();
    errorElement.innerText = messages.join(", ");
  } else {
    //e.preventDefault();
    let form_data = { name: name.value, password: password.value };
    alert(JSON.stringify(form_data));
  }
});
