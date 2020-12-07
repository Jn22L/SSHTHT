(function () {
  const navigation = document.getElementById("navigation");

  const routes = {
    "/nav__home": "./pages/home.html",
    "/nav__todo": "./pages/todolist.html",
    "/nav__pushstate": "./pages/pushstate.html",
  };

  function goMenu(path) {
    //alert("goMenu url:" + getContextPath() + path);
    //$("article").load(getContextPath() + path);
    $("article").load(path);
    //setUnselectedAll();
    //document.getElementById("nav__todo").setAttribute("class", "selected");
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

  navigation.addEventListener("click", (e) => {
    if (!e.target.matches("#navigation > li > a")) return;
    e.preventDefault();
    const path = e.target.getAttribute("href");
    goMenu(routes[path]);
  });
})();
