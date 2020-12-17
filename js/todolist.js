(function () {
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

  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert("XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ");
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open("GET", "https://jn22l.herokuapp.com/getKeys");
    httpRequest.send();
  }

  function alertContents() {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          alert(httpRequest.responseText);
        } else {
          alert("There was a problem with the request.");
        }
      }
    } catch (e) {
      alert("Caught Exception: " + e.description);
    }
  }

  // get
  // function makeRequest2() {
  //   fetch("https://jn22l.herokuapp.com/getKeys")
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (myJson) {
  //       console.log(JSON.stringify(myJson));
  //     });
  // }

  // post
  // Example POST method implementation:

  function postData(url = "", data = {}) {
    // Default options are marked with *
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then((response) => response.json()); // parses JSON response into native JavaScript objects
  }

  function makeRequest3(url, redisKey) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert("XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ");
      return false;
    }
    httpRequest.onreadystatechange = alertContents3;
    httpRequest.open("POST", url);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //httpRequest.send("id=" + encodeURIComponent(redisKey));
    httpRequest.send();

    console.log(encodeURIComponent(redisKey));
  }

  function alertContents3() {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          //alert(httpRequest.responseText);
          var response = JSON.parse(httpRequest.responseText);
          alert(response.computedString);
        } else {
          alert("There was a problem with the request.");
        }
      }
    } catch (e) {
      alert("Caught Exception: " + e.description);
    }
  }

  document.getElementById("btnAdd").addEventListener("click", addList); // 추가
  document.getElementById("inputAdd").addEventListener("keydown", addListEnter); // 추가 - 엔터키
  document.getElementById("btnDelAll").addEventListener("click", delAllEle); // 전체삭제
  document.getElementById("btnDelLast").addEventListener("click", delLastEle); // 마지막 요소 삭제
  document.getElementById("DeleteSel").addEventListener("click", delSelected); // 선택 삭제
  document.getElementById("ajaxButton").addEventListener("click", makeRequest); // 조회(GET:전체목록)
  //document.getElementById("ajaxButton2").addEventListener("click", makeRequest2); // 조회(GET:fetch사용:전체목록)

  document.getElementById("ajaxButton3").onclick = function () {
    var redisKey = document.getElementById("inputAdd").value;
    if (redisKey === "" || redisKey == null) {
      alert("redisKey를 입력해 주세요.");
      return;
    }

    postData("https://jsonplaceholder.typicode.com/todos", { id: 2 })
      .then((data) => console.log(data)) // JSON-string from `response.json()` callconsole.log(JSON.stringify(data))) // JSON-string from `response.json()` call
      .catch((error) => console.error(error));
  };
})();
