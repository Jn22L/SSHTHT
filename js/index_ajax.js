(function () {
  const root = document.querySelector("article");
  const navigation = document.getElementById("navigation");

  const routes = {
    // id: url
    nav__home: "/pages/home.html",
    nav__todo: "/pages/todolist.html",
    nav__pushstate: "/pages/pushstate.html",
  };

  const render = async (id) => {
    try {
      const url = routes[id];
      if (!url) {
        root.innerHTML = `${url} Not Found`;
        return;
      }

      const res = await fetch(url);
      const contentType = res.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        const json = await res.json();
        root.innerHTML = `<h1>${json.title}</h1><p>${json.content}</p>`;
      } else {
        root.innerHTML = await res.text();
        nodeScriptReplace(root); // <script> 실행되도록  replace
      }
    } catch (err) {
      console.error(err);
    }
  };

  function nodeScriptReplace(node) {
    if (nodeScriptIs(node) === true) {
      node.parentNode.replaceChild(nodeScriptClone(node), node);
    } else {
      var i = -1,
        children = node.childNodes;
      while (++i < children.length) {
        nodeScriptReplace(children[i]);
      }
    }

    return node;
  }
  function nodeScriptClone(node) {
    var script = document.createElement("script");
    script.text = node.innerHTML;

    var i = -1,
      attrs = node.attributes,
      attr;
    while (++i < attrs.length) {
      script.setAttribute((attr = attrs[i]).name, attr.value);
    }
    return script;
  }

  function nodeScriptIs(node) {
    return node.tagName === "SCRIPT";
  }

  // AJAX 요청은 주소창의 url을 변경시키지 않으므로 history 관리가 되지 않는다.
  navigation.onclick = (e) => {
    if (!e.target.matches("#navigation > li > a")) return;
    e.preventDefault();
    render(e.target.id);
  };

  // DOMContentLoaded은 HTML과 script가 로드된 시점에 발생하는 이벤트로 load 이벤트보다 먼저 발생한다. (IE 9 이상 지원)
  // 새로고침이 클릭되었을 때, 웹페이지가 처음 로딩되었을 때, 현 페이지(예를들어 loclahost:5002)를 서버에 요청한다. 이때 Home에 필요한 리소스를 Ajax 요청한다.
  window.addEventListener("DOMContentLoaded", () => render("nav__home"));
})();
