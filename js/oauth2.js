(() => {
  let FRONTEND_URL = "";
  if (window.location.host.indexOf("localhost") > -1 || window.location.host.indexOf("127.0.0.1") > -1) {
    FRONTEND_URL = "http://127.0.0.1:5500"; // 로컬
  } else {
    FRONTEND_URL = "https://jn22l.github.io/sshtht"; // 깃허브
  }

  const goGoogleAuthPage = document.querySelector("#go_auth");
  const btnRefreshToken = document.querySelector("#btnRefreshToken");
  const btnGoogleCalendar = document.querySelector("#btnGoogleCalendar");
  const btnGoogleUserInfo = document.querySelector("#btnGoogleUserInfo");

  // 1. 구글 인증페이지 이동
  const handleGoGoogleAuthPage = (e) => {
    e.preventDefault();

    const base_url = "https://accounts.google.com/o/oauth2/v2/auth";

    const params = new URLSearchParams();
    params.append(
      "scope",
      "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email"
    );
    params.append("access_type", "offline");
    params.append("include_granted_scopes", "true");
    params.append("response_type", "code");
    params.append("state", "state_parameter_passthrough_value");
    params.append("redirect_uri", `${FRONTEND_URL}/pages/oauth2_redirect.html`);
    params.append("client_id", "918132959543-h23a9ui6pdc5072vfo45mf24d4hhdvon.apps.googleusercontent.com");

    const full_url = base_url + "?" + params.toString();
    console.log("구글인증페이지로 이동", full_url);
    window.location.href = full_url;
  };

  // 2. code 로 access_token 얻기 -> oauth2_redirect.html 에서 정의

  // 3. refresh_token 으로 access_token 갱신하기
  const handleRefreshToken = (e) => {
    var refresh_token = document.querySelector("input[name=refresh_token]").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "918132959543-h23a9ui6pdc5072vfo45mf24d4hhdvon.apps.googleusercontent.com");
    urlencoded.append("client_secret", "lOiDZwgIeViwyL8fS0sYAh4A");
    urlencoded.append("refresh_token", refresh_token);
    urlencoded.append("grant_type", "refresh_token");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://www.googleapis.com/oauth2/v4/token", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("refresh_token 으로 access_token 얻기", result);
        document.querySelector("input[name=access_token]").value = result.access_token;
        alert("refresh_token 으로 access_token 을 성공적으로 얻었습니다.");
      })
      .catch((error) => console.log("error", error));
  };

  // 구글 calendar 가져오기
  const handleGoogleCalendar = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    var access_token = document.querySelector("input[name=access_token]").value;
    var divGoogleCalendar = document.querySelector("#divGoogleCalendar");

    fetch(`https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=${access_token}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("구글 calendar 가져오기", result);
        result.items.map((element) => {
          divGoogleCalendar.innerHTML = divGoogleCalendar.innerHTML + `${element.summary}<br>`;
        });
      })
      .catch((error) => console.log("error", error));
  };

  // 구글 userinfo 가져오기
  const handleGoogleUserInfo = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    var access_token = document.querySelector("input[name=access_token]").value;
    var divGoogleUserInfo = document.querySelector("#divGoogleUserInfo");

    fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("구글 userinfo 가져오기", result);
        divGoogleUserInfo.innerHTML = result.name;
      })
      .catch((error) => console.log("error", error));
  };

  const init = () => {
    //alert(location.origin);

    goGoogleAuthPage.addEventListener("click", handleGoGoogleAuthPage);
    btnRefreshToken.addEventListener("click", handleRefreshToken); // refresh_token 으로 access_token 갱신
    btnGoogleCalendar.addEventListener("click", handleGoogleCalendar); // 구글 calendar
    btnGoogleUserInfo.addEventListener("click", handleGoogleUserInfo); // 구글 사용자정보

    const access_token = new URLSearchParams(location.search).get("access_token");
    const refresh_token = new URLSearchParams(location.search).get("refresh_token");
    document.querySelector("input[name=access_token]").value = access_token;
    document.querySelector("input[name=refresh_token]").value = refresh_token;
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
