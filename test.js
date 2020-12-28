(() => {
  const divTest = document.querySelector("#divTest");
  const btnTest = document.querySelector("#btnTest");

  const handleBtnTestClick = () => {
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");

    const params = url.searchParams;
    params.append(
      "scope",
      "https://www.googleapis.com/auth/calendar" +
        " https://www.googleapis.com/auth/calendar.readonly" +
        " https://www.googleapis.com/auth/plus.login" +
        " https://www.googleapis.com/auth/userinfo.email"
    );
    params.append("access_type", "offline");
    params.append("include_granted_scopes", "true");
    params.append("response_type", "code");
    params.append("state", "state_parameter_passthrough_value");
    params.append("redirect_uri", `http://127.0.0.1:5500/pages/oauth2_redirect.html`);
    params.append("client_id", "918132959543-h23a9ui6pdc5072vfo45mf24d4hhdvon.apps.googleusercontent.com");

    console.log("구글인증페이지로 이동", url.toString());
    window.location.href = url;
  };

  const init = () => {
    btnTest.addEventListener("click", handleBtnTestClick);
  };
  init();
})();
