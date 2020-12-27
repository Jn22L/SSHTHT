(function () {
  const navigation = document.getElementById("navigation");
  const routes = {
    "/home": "./pages/home.html",
    "/formvali": "./pages/formvali.html",
    "/todo": "./pages/todolist.html",
    "/oauth2": "./pages/oauth2.html",
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

  function init() {
    // 메뉴클릭시
    navigation.addEventListener("click", (e) => {
      if (!e.target.matches("#navigation > li > a")) return;
      e.preventDefault();
      const path = e.target.getAttribute("href");
      goMenu(path, routes[path]);
      console.log(path, routes[path]);
    });

    //oauth2 redirect uri 처리 ( http://127.0.0.1:5500/oauth2_redirect )
    const page = new URLSearchParams(location.search).get("page");
    const access_token = new URLSearchParams(location.search).get("access_token");
    const refresh_token = new URLSearchParams(location.search).get("refresh_token");
    if (page === "oauth2") {
      console.log(access_token);
      goMenu("/oauth2", "./pages/oauth2.html");
    }

    if (location.pathname === "oauth2_redirect") {
      const google_auth_code = new URLSearchParams(location.search).get("code");
      console.log("구글인증코드", google_auth_code);
      //goMenu(path, routes[path]);
    }
  }

  init();
})();
