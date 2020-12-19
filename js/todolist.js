(function () {
  const dbSelectList = document.getElementById("dbSelectList");

  // 추가
  function addList() {
    var contents = document.querySelector(".text-basic");
    if (!contents.value) {
      alert("내용을 입력해주세요.");
      contents.focus();
      return false;
    }
    var tr = document.createElement("tr");
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "btn-chk");
    var td01 = document.createElement("td");
    td01.appendChild(input);
    tr.appendChild(td01);
    var td02 = document.createElement("td");
    td02.innerHTML = contents.value;
    tr.appendChild(td02);
    document.getElementById("listBody").appendChild(tr);
    contents.value = "";
    contents.focus();
  }

  // 추가 - 목록클릭시
  function addList2(obj) {
    // 전체삭제
    var list = document.getElementById("listBody");
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    // 목록추가
    obj.information.map((v) => {
      var tr = document.createElement("tr");
      var input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("class", "btn-chk");
      var td01 = document.createElement("td");
      td01.appendChild(input);
      tr.appendChild(td01);
      var td02 = document.createElement("td");
      td02.innerHTML = v.name;
      tr.appendChild(td02);
      document.getElementById("listBody").appendChild(tr);
    });
  }

  // 추가 - 엔터키
  function addListEnter(event) {
    const keyCode = event.keyCode;
    if (keyCode == 13) {
      addList();
    }
  }

  // 전체삭제
  function delAllEle() {
    var list = document.getElementById("listBody");
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }

  // 마지막 항목 삭제
  function delLastEle() {
    var body = document.getElementById("listBody");
    var list = document.querySelectorAll("#listBody > tr");
    if (list.length > 0) {
      var liLen = list.length - 1;
      body.removeChild(list[liLen]);
    } else {
      alert("삭제할 항목이 없습니다.");
      return false;
    }
  }

  // 선택 삭제
  function delSelected() {
    var body = document.getElementById("listBody");
    var chkbox = document.querySelectorAll("#listBody .btn-chk");
    for (var i in chkbox) {
      if (chkbox[i].nodeType == 1 && chkbox[i].checked == true) {
        body.removeChild(chkbox[i].parentNode.parentNode);
      }
    }
  }

  // DB 전체목록조회
  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert("XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ");
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open("GET", "http://localhost:8080/board/select");
    httpRequest.send();
  }

  function alertContents() {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          //console.log("전체조회", JSON.parse(httpRequest.responseText));
          //addSelectedList(httpRequest.responseText);
          addSelectedList(JSON.parse(httpRequest.responseText));
        } else {
          alert("There was a problem with the request.");
        }
      }
    } catch (e) {
      alert("Caught Exception: " + e.description);
    }
  }

  // DB 전체목록조회 결과 하단에 출력
  function addSelectedList(jsonObj) {
    const ul = document.getElementById("dbSelectList");
    // 전체삭제
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    // 목록추가
    jsonObj.map((v) => {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.setAttribute("href", v.testId);
      a.innerHTML = v.testName;
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  // 하단 목록 클릭시, 상세 데이타 조회
  dbSelectList.addEventListener("click", (e) => {
    //if (!e.target.matches("#navigation > li > a")) return;
    e.preventDefault();

    const raw = e.target.getAttribute("href");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://jn22l.herokuapp.com/getValue", requestOptions)
      .then((response) => response.text())
      //.then((result) => addList2(result))
      .then((result) => addList2(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  });

  // 이벤트
  document.getElementById("btnAdd").addEventListener("click", addList); // 추가
  document.getElementById("inputAdd").addEventListener("keydown", addListEnter); // 추가 - 엔터키
  document.getElementById("btnDelAll").addEventListener("click", delAllEle); // 전체삭제
  document.getElementById("btnDelLast").addEventListener("click", delLastEle); // 마지막 요소 삭제
  document.getElementById("DeleteSel").addEventListener("click", delSelected); // 선택 삭제

  // 최초 로딩시 : 하단에 목록 출력
  makeRequest();
})();
