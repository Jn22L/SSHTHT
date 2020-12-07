(function () {
  document.getElementById("nav__home").addEventListener("click", goMenuHome);
  document.getElementById("nav__todo").addEventListener("click", goMenuTodo);
  document
    .getElementById("nav__pushstate")
    .addEventListener("click", goMenuPushState);

  function goMenuHome() {
    $("article").load(getContextPath() + "/pages/home.html");
    setUnselectedAll();
    document.getElementById("nav__home").setAttribute("class", "selected"); // 선택된 메뉴표시
  }

  function goMenuTodo() {
    $("article").load(getContextPath() + "/pages/todolist.html");
    setUnselectedAll();
    document.getElementById("nav__todo").setAttribute("class", "selected");
  }

  function goMenuPushState() {
    $("article").load(getContextPath() + "/pages/pushstate.html");
    setUnselectedAll();
    document.getElementById("nav__pushstate").setAttribute("class", "selected");
  }

  function setUnselectedAll() {
    let li_tags = document.querySelectorAll("li a");
    li_tags.forEach(function (v) {
      console.log(v);
      v.setAttribute("class", "unselected");
    });
  }

  function getContextPath() {
    var hostIndex = location.href.indexOf(location.host) + location.host.length;
    return location.href.substring(
      hostIndex,
      location.href.indexOf("/", hostIndex + 1)
    );
  }
})();
