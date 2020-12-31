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

  const btnGoogleCalendar2 = document.querySelector("#btnGoogleCalendar2");
  const btnGoogleUserInfo2 = document.querySelector("#btnGoogleUserInfo2");
  const btnLogout = document.querySelector("#btnLogout");
  const btnUnlink = document.querySelector("#btnUnlink");

  const USER_ACCESS_TOKEN = "-BIYyPyezhzeve9V-q1Y7gtOCEpMF8sNMad0ZAo9dBEAAAF2t1v87Q";

  // 1. KAKAO 인증페이지 이동
  const handleGoGoogleAuthPage = (e) => {
    e.preventDefault();

    // REST
    // const authUrl = new URL("https://kauth.kakao.com/oauth/authorize");
    // const params = authUrl.searchParams;
    // params.append("response_type", "code");
    // params.append("client_id", "f65857604d13f09a40b0122c2bbc7d94");
    // params.append("redirect_uri", `${FRONTEND_URL}/redirect.html`);
    // window.location.href = authUrl;

    // SDK
    if (!Kakao.isInitialized()) {
      Kakao.init("c65e1f58ae73f239dca102d177d9da8a");
    }
    Kakao.Auth.authorize({
      redirectUri: "http://127.0.0.1:5500/pages/oauth2_kakao_redirect.html",
      scope: "friends",
    });
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

  // KAKAO 사용자정보 가져오기
  const handleGoogleCalendar = () => {
    if (!Kakao.isInitialized()) {
      Kakao.init("c65e1f58ae73f239dca102d177d9da8a");
    }
    Kakao.Auth.setAccessToken(USER_ACCESS_TOKEN);
    Kakao.API.request({
      url: "/v2/user/me",
      success: function (response) {
        console.log(response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  // KAKAO 나에게 메시지 보내기
  const handleGoogleUserInfo = () => {
    Kakao.API.request({
      url: "/v2/api/talk/memo/default/send",
      data: {
        template_object: {
          object_type: "feed",
          content: {
            title: "카카오톡 링크 4.0",
            description: "디폴트 템플릿 FEED",
            image_url: "http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
            link: {
              web_url: "https://developers.kakao.com",
              mobile_web_url: "https://developers.kakao.com",
            },
          },
          social: {
            like_count: 100,
            comment_count: 200,
          },
          button_title: "바로 확인",
        },
      },
      success: function (response) {
        console.log(response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  // KAKAO 친구목록 가져오기
  const handleGoogleCalendar2 = () => {
    console.log("KAKAO 친구목록 가져오기");

    // Kakao.init("c65e1f58ae73f239dca102d177d9da8a");
    // Kakao.isInitialized();
    Kakao.Auth.setAccessToken(USER_ACCESS_TOKEN);

    Kakao.API.request({
      url: "/v1/api/talk/friends",
      success: function (response) {
        console.log("친구목록성공:", response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  // KAKAO 친구에게 메시지 보내기
  const handleGoogleUserInfo2 = () => {
    Kakao.API.request({
      url: "/v2/api/talk/memo/default/send",
      data: {
        template_object: {
          object_type: "feed",
          content: {
            title: "카카오톡 링크 4.0",
            description: "디폴트 템플릿 FEED",
            image_url: "http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
            link: {
              web_url: "https://developers.kakao.com",
              mobile_web_url: "https://developers.kakao.com",
            },
          },
          social: {
            like_count: 100,
            comment_count: 200,
          },
          button_title: "바로 확인",
        },
      },
      success: function (response) {
        console.log(response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  // KAKAO 로그아웃
  const handleLogout = () => {
    if (!Kakao.Auth.getAccessToken()) {
      console.log("Not logged in.");
      return;
    }
    Kakao.Auth.logout(function () {
      console.log(Kakao.Auth.getAccessToken());
    });
  };

  // KAKAO 연결끊기
  const handleUnlink = () => {
    Kakao.API.request({
      url: "/v1/user/unlink",
      success: function (response) {
        console.log(response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  const init = () => {
    //alert(location.origin);

    goGoogleAuthPage.addEventListener("click", handleGoGoogleAuthPage);
    btnRefreshToken.addEventListener("click", handleRefreshToken); // refresh_token 으로 access_token 갱신
    btnGoogleCalendar.addEventListener("click", handleGoogleCalendar); // 구글 calendar
    btnGoogleUserInfo.addEventListener("click", handleGoogleUserInfo); // 구글 사용자정보
    btnGoogleCalendar2.addEventListener("click", handleGoogleCalendar2); // 친구목록 가져오기
    btnGoogleUserInfo2.addEventListener("click", handleGoogleUserInfo2); // 친구에게 메시지 보내기
    btnLogout.addEventListener("click", handleLogout); // 로그아웃
    btnUnlink.addEventListener("click", handleUnlink); // 연결끊기

    const access_token = new URLSearchParams(location.search).get("access_token");
    const refresh_token = new URLSearchParams(location.search).get("refresh_token");
    document.querySelector("input[name=access_token]").value = access_token;
    document.querySelector("input[name=refresh_token]").value = refresh_token;
  };

  init();
})();
