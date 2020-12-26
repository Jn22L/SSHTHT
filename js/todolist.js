(function () {
  let BACKEND_URL = "";
  if (window.location.host.indexOf("localhost") > -1 || window.location.host.indexOf("127.0.0.1") > -1) {
    BACKEND_URL = "http://localhost:8080"; // 로컬
  } else {
    BACKEND_URL = "https://sshtht-springboot-mariadb.herokuapp.com"; // 깃허브일때 -> HEROKU
  }

  // 로컬 백엔드 수정시 주석필요!
  BACKEND_URL = "https://sshtht-springboot-mariadb.herokuapp.com"; // 깃허브일때 -> HEROKU

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
    td02.setAttribute("class", "todo-list-data");
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
    obj.map((v) => {
      var tr = document.createElement("tr");
      var input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("class", "btn-chk");
      var td01 = document.createElement("td");
      td01.appendChild(input);
      tr.appendChild(td01);
      var td02 = document.createElement("td");
      td02.setAttribute("class", "todo-list-data");
      td02.innerHTML = v.todoList;
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
  function selectToListAll() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(BACKEND_URL + "/board/selectall", requestOptions)
      //.then((response) => response.json())
      .then(
        (successResponse) => {
          if (successResponse.status != 200) {
            return null;
          } else {
            return successResponse.json();
          }
        },
        (failResponse) => {
          return null;
        }
      )
      .then((result) => selectAll(result))
      .catch((error) => console.log("error", error));
  }

  function selectAll(jsonObj) {
    const ul = document.getElementById("dbSelectList");
    // 전체삭제
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    // 목록추가
    jsonObj.map((v) => {
      var li = document.createElement("li");

      var a = document.createElement("a");
      a.setAttribute("href", v.todoDt);
      a.innerHTML = v.todoDt + " " + v.todoList;

      let inputAdd = document.getElementById("inputAdd");
      var btnDel = document.createElement("input");
      btnDel.setAttribute("type", "button");
      btnDel.setAttribute("id", v.todoDt);
      btnDel.setAttribute("class", "btn-del");
      inputAdd.value === "admin" ? (btnDel.hidden = false) : (btnDel.hidden = true); // admin 이면 삭제버튼 유지
      btnDel.value = "❌";

      li.appendChild(a);
      li.appendChild(btnDel);
      ul.appendChild(li);
    });
  }

  // 하단 목록 이벤트 ( DB 상세조회 / DB 삭제 )
  function handleBottomClick(event) {
    event.preventDefault();
    if (event.target.tagName === "A") {
      selectOneList(event.target.getAttribute("href"));
    } else if (event.target.tagName === "INPUT") {
      if (window.confirm("삭제할까요?")) deleteDB(event.target.getAttribute("id"));
    }
  }

  // DB 상세조회
  function selectOneList(selectKey) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${BACKEND_URL}/board/selectonelist?todoDt=${selectKey}`, requestOptions)
      .then((response) => response.json())
      .then((result) => addList2(result))
      .catch((error) => console.log("error", error));
  }

  // DB 삭제
  function deleteDB(deleteKey) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ todoDt: deleteKey });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(BACKEND_URL + "/board/deleteone", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        selectToListAll(); // 전체조회
      })
      .catch((error) => console.log("error", error));
  }

  // DB 저장
  function saveDB() {
    if (!window.confirm("저장할까요?")) return;

    // 할일목록 배열저장
    var todolist = document.querySelectorAll(".todo-list-data");
    var insertArr = [];

    todolist.forEach(function (val, idx) {
      insertArr.push({ todoDt: getCurrentTime(), todoSeq: idx, todoList: val.textContent });
    });

    // REST 호출
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(insertArr);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(BACKEND_URL + "/board/insertlist", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        selectToListAll(); // 전체조회
      })
      .catch((error) => console.log("error", error));
  }

  // 현재시간（yyyy/mm/dd hh:mm:ss）
  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }
  function getCurrentTime() {
    var now = new Date();
    var res =
      "" + now.getFullYear() + "/" + padZero(now.getMonth() + 1) + "/" + padZero(now.getDate()) + " " + padZero(now.getHours()) + ":" + padZero(now.getMinutes()) + ":" + padZero(now.getSeconds());
    return res;
  }

  // admin 체크
  const handleChange = (event) => {
    var btnSave = document.getElementById("btnSaveDB");
    var btnDel = document.querySelectorAll(".btn-del");
    if (event.target.value === "admin") {
      btnSave.hidden = false;
      if (btnDel.length > 0) btnDel.forEach((v) => (v.hidden = false));
    } else {
      btnSave.hidden = true;
      if (btnDel.length > 0) btnDel.forEach((v) => (v.hidden = true));
    }
  };

  function init() {
    document.getElementById("btnAdd").addEventListener("click", addList); // 추가
    document.getElementById("inputAdd").addEventListener("keydown", addListEnter); // input 엔터
    document.getElementById("inputAdd").addEventListener("input", handleChange); // admin 체크
    document.getElementById("btnSaveDB").addEventListener("click", saveDB); // DB저장
    document.getElementById("dbSelectList").addEventListener("click", handleBottomClick); // 하단 목록 클릭 ( DB상세조회, DB삭제 )
    document.getElementById("btnDelAll").addEventListener("click", delAllEle); // 전체삭제
    document.getElementById("btnDelLast").addEventListener("click", delLastEle); // 마지막 요소 삭제
    document.getElementById("DeleteSel").addEventListener("click", delSelected); // 선택 삭제

    selectToListAll();
  }

  init();
})();
