(function () {
  const navigation = document.getElementById("navigation");
  const routes = {
    "/home": "./pages/home.html",
    "/formvali": "./pages/formvali.html",
    "/todo": "./pages/todolist.html",
    "/closure": "./pages/closure_test.html",
    "/pushstate": "./pages/pushstate.html",
  };

  function goMenu(path, route) {
    $("article").load(route);

    //선택 메뉴 표시
    setUnselectedAll();
    document.querySelector(`#navigation li a[href="${path}"]`).setAttribute("class", "selected");
  }

  function setUnselectedAll() {
    let tags = document.querySelectorAll("#navigation li a");
    tags.forEach(function (tag) {
      tag.setAttribute("class", "unselected");
    });
  }

  navigation.addEventListener("click", (e) => {
    if (!e.target.matches("#navigation > li > a")) return;
    e.preventDefault();
    const path = e.target.getAttribute("href");
    goMenu(path, routes[path]);
  });
})();
