(() => {
  const goGoogleAuthPage = document.querySelector("#go_auth");

  const handleGoGoogleAuthPage = (e) => {
    e.preventDefault();
    let scope = "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly";

    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2Fpages%2Foauth2_redirect.html&client_id=918132959543-h23a9ui6pdc5072vfo45mf24d4hhdvon.apps.googleusercontent.com";
  };

  const init = () => {
    goGoogleAuthPage.addEventListener("click", handleGoGoogleAuthPage);
    //app.innerHTML = "OAuth2 사용하여 구글 인증해 보자 천천히 해보자 ~ ";
  };

  init();
})();

/* 2. accessToken 얻기
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
var urlencoded = new URLSearchParams();
urlencoded.append("code", "4/0AY0e-g6YRmeGAsB4mM1rs1M6l3GiYSt2Sa2clX7kFHFtpC9A_JsgscSPcnzObWNWTHAGVw");
urlencoded.append("client_id", "918132959543-h23a9ui6pdc5072vfo45mf24d4hhdvon.apps.googleusercontent.com");
urlencoded.append("client_secret", "lOiDZwgIeViwyL8fS0sYAh4A");
urlencoded.append("redirect_uri", "http://127.0.0.1:5500/index.html");
urlencoded.append("grant_type", "authorization_code");
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};
fetch("https://www.googleapis.com/oauth2/v4/token", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
// 결과 샘플
{
    "access_token": "ya29.a0AfH6SMA95VYgCKuWGDvDiR9SzTEQ-BHi3R8YdMuzNKCyi4fjCgRg9ztk2QMMHJBOvSPHAYhvEmkSvoj6gO_o737TIP1yPUjWvrZBdm-Uw0W77GVTzDD7JzVvx9v2kuzoTc0JzUThvh-nwnReKObV2JD3aQXXOjxXF0fp_7TcxuM",
    "expires_in": 3599,
    "refresh_token": "1//0e0I0FNYtXMRFCgYIARAAGA4SNwF-L9IrR_mBu4XVIrkfG-2KrxdIYrmQSIhbUFdQ3_uW3Z_anVMxcNCjZHIBVGgPdE03O4AIRmk",
    "scope": "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar",
    "token_type": "Bearer"
}
  */

/* 3. refresh token 으로 accessToken 얻기 : 사용자 인증이 최초일때 refresh_token 은 1번만 리턴된다.
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
var urlencoded = new URLSearchParams();
urlencoded.append("client_id", "918132959543-h23a9ui6pdc5072vfo45mf24d4hhdvon.apps.googleusercontent.com");
urlencoded.append("client_secret", "lOiDZwgIeViwyL8fS0sYAh4A");
urlencoded.append("refresh_token", "1//0e0I0FNYtXMRFCgYIARAAGA4SNwF-L9IrR_mBu4XVIrkfG-2KrxdIYrmQSIhbUFdQ3_uW3Z_anVMxcNCjZHIBVGgPdE03O4AIRmk");
urlencoded.append("grant_type", "refresh_token");
var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow",
};
fetch("https://www.googleapis.com/oauth2/v4/token", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
  
  */
