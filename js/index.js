(function () {
  const navigation = document.getElementById("navigation");
  const routes = {
    "/home": "./pages/home.html",
    "/formvali": "./pages/formvali.html",
    "/todo": "./pages/todolist.html",
    "/oauth2Google": "./pages/oauth2_google.html",
    "/oauth2Kakao": "./pages/oauth2_kakao.html",
    "/fetchExample": "./pages/fetch_example.html",
    "/fileUpload": "./pages/file_upload.html",
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

    //oauth2 redirect uri 처리
    const page = new URLSearchParams(location.search).get("page");
    const access_token = new URLSearchParams(location.search).get("access_token");
    const refresh_token = new URLSearchParams(location.search).get("refresh_token");
    switch (page) {
      case "oauth2Google":
        console.log("oauth2Google", access_token);
        goMenu("/oauth2Google", "./pages/oauth2_google.html");
        break;
      case "oauth2Kakao":
        console.log("oauth2Kakao", access_token);
        goMenu("/oauth2Kakao", "./pages/oauth2_kakao.html");
        break;
      default:
        console.log(`Sorry,`);
    }
  }

  init();
})();
