"use strict";
document.getElementById("pushstate1").addEventListener("click", testPushState1);
document.getElementById("pushstate2").addEventListener("click", testPushState2);
document.getElementById("pushstate3").addEventListener("click", testPushState3);
document.getElementById("pushstate4").addEventListener("click", testPushState4);
document.getElementById("pushstate5").addEventListener("click", testPushState5);
document.querySelector("#prev").addEventListener("click", testPrev);
document.querySelector("#next").addEventListener("click", testNext);

window.onpopstate = function (event) {
  console.log(event);
  //alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};

function testPushState1() {
  const state = { page_id: 1, user_id: "일" };
  const title = "첫번째push";
  const url = "/11111";
  history.pushState(state, title, url);

  console.log(history, history.state);
}

function testPushState2() {
  const state = { page_id: 2, user_id: "이" };
  const title = "두번째push";
  const url = "/22222";
  history.pushState(state, title, url);

  console.log(history, history.state);
}

function testPushState3() {
  const state = { page_id: 3, user_id: "삼" };
  const title = "세번째push";
  const url = "/33333";
  history.pushState(state, title, url);

  console.log(history, history.state);
}

function testPushState4() {
  const state = { page_id: 4, user_id: "사" };
  const title = "네번째push";
  const url = "/44444";
  history.pushState(state, title, url);

  console.log(history, history.state);
}

function testPushState5() {
  const state = { page_id: 5, user_id: "오" };
  const title = "다섯번째push";
  const url = "/55555";
  history.pushState(state, title, url);

  console.log(history, history.state);
}

function testPrev() {
  history.back();
  console.log(history, history.state);
  document.querySelector("#state").innerHTML = JSON.stringify(history.state);
}

function testNext() {
  history.forward();
  console.log(history, history.state);
  document.querySelector("#state").innerHTML = JSON.stringify(history.state);
}

function testGo() {
  history.go();
  console.log(history, history.state);
  document.querySelector("#state").innerHTML = JSON.stringify(history.state);
}
