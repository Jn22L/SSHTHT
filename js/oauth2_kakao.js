(() => {
  // 로컬 VS 깃헙 URL 설정
  let FRONTEND_URL = "";
  if (window.location.host.indexOf("localhost") > -1 || window.location.host.indexOf("127.0.0.1") > -1) {
    FRONTEND_URL = "http://127.0.0.1:5500"; // 로컬
  } else {
    FRONTEND_URL = "https://jn22l.github.io/sshtht"; // 깃허브
  }

  // 결과 출력 div
  const divKakao = document.querySelector("#divKakao");

  /**
   *
   * 1. KAKAO 인증페이지 이동
   *
   */
  const handleGoKakaoAuthPage = (e) => {
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
      redirectUri: `${FRONTEND_URL}/pages/oauth2_kakao_redirect.html`,
      scope: "friends", // 이용중 동의! ( 친구목록 )
    });
  };

  /**
   *
   * 2. code 로 access_token 얻기 -> oauth2_kakao_redirect.html 에서 정의
   *
   */

  /**
   * 3. refresh_token 으로 access_token 갱신하기 ( access_token 만료시 )
   *   - 카카오 토큰 만료시간
   *     access_token : 6시간 , refresh_token : 2달
   */
  const handleRefreshToken = (e) => {
    var refresh_token = document.querySelector("input[name=refresh_token]").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "f65857604d13f09a40b0122c2bbc7d94");
    //urlencoded.append("client_secret", "lOiDZwgIeViwyL8fS0sYAh4A");
    urlencoded.append("refresh_token", refresh_token);
    urlencoded.append("grant_type", "refresh_token");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://kauth.kakao.com/oauth/token", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("refresh_token 으로 access_token 얻기", result);
        document.querySelector("input[name=access_token]").value = result.access_token;
        divKakao.innerHTML = `refresh_token 토큰으로 access_token 갱신 성공<br>
             access_token: ${result.access_token}<br>
             expires_in: ${result.expires_in}<br>
             token_type: ${result.token_type}<br>
          `;
      })
      .catch((error) => console.log("error", error));
  };

  /**
   *
   * KAKAO 사용자정보 가져오기
   *
   */
  const handleGetUserInfo = () => {
    const USER_ACCESS_TOKEN = document.querySelector("input[name=access_token]").value;

    if (!Kakao.isInitialized()) {
      Kakao.init("c65e1f58ae73f239dca102d177d9da8a");
    }
    Kakao.Auth.setAccessToken(USER_ACCESS_TOKEN);
    Kakao.API.request({
      url: "/v2/user/me",
      success: function (response) {
        console.log("KAKAO 사용자정보 가져오기", response);
        divKakao.innerHTML = response.properties.nickname;
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  /**
   * KAKAO 나에게 메시지 보내기
   *   - 템플릿은 추후 필요시 다듬을것, 지금은 메시지 보내는것 까지만 ...
   *
   */
  const handleSendMsgMe = () => {
    const smTitle = document.querySelector("input[name=sm_title]");
    const smDesc = document.querySelector("input[name=sm_desc]");

    if (smTitle.value === "" || smTitle.value == null) {
      alert("제목을 입력해 주세요");
      smTitle.focus();
      return;
    }

    if (smDesc.value === "" || smDesc.value == null) {
      alert("내용을 입력해 주세요");
      smDesc.focus();
      return;
    }

    console.log(smTitle.value, smDesc.value);

    if (!Kakao.isInitialized()) {
      Kakao.init("c65e1f58ae73f239dca102d177d9da8a");
    }
    Kakao.API.request({
      url: "/v2/api/talk/memo/default/send",
      data: {
        template_object: {
          object_type: "feed",
          content: {
            title: smTitle.value,
            description: smDesc.value,
            //image_url: "http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
            image_url: "",
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
        alert("나에게 알림톡 보내기 성공!");
        smTitle.value = "";
        smDesc.value = "";
        smTitle.focus();
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  /**
   * KAKAO 친구목록 가져오기
   *   - 이슈 : 팀관리에 팀원이 있음에도, 목록이 0 으로 나오고 있음.
   *   - 계획 : 팀원의 카톡계정확인필요
   */
  const handleGetFriendsList = () => {
    console.log("KAKAO 친구목록 가져오기");
    const USER_ACCESS_TOKEN = document.querySelector("input[name=access_token]").value;

    if (!Kakao.isInitialized()) {
      Kakao.init("c65e1f58ae73f239dca102d177d9da8a");
    }
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

  /**
   *
   *  KAKAO 친구에게 메시지 보내기 ( 친구목록이 안나와서 구현중)
   *
   */
  const handleSendMsgFriend = () => {
    alert("친구 uuid 가 없어서 구현중. 친구목록이 안보이는 이유부터 확인할것");
  };

  /**
   *
   *  init(이벤트 정의, 리다이렉트 받기)
   *
   */
  const init = () => {
    // 이벤트 정의
    const goKakaoAuthPage = document.querySelector("#go_auth");
    const btnRefreshToken = document.querySelector("#btnRefreshToken");
    const btnGetUserInfo = document.querySelector("#btnGetUserInfo");
    const btnSendMsgMe = document.querySelector("#btnSendMsgMe");
    const btnGetFriendsList = document.querySelector("#btnGetFriendsList");
    const btnSendMsgFriend = document.querySelector("#btnSendMsgFriend");

    goKakaoAuthPage.addEventListener("click", handleGoKakaoAuthPage); // 인증페이지 이동
    btnRefreshToken.addEventListener("click", handleRefreshToken); // refresh_token 으로 access_token 갱신
    btnGetUserInfo.addEventListener("click", handleGetUserInfo); // 로그인 사용자 정보
    btnSendMsgMe.addEventListener("click", handleSendMsgMe); // 나에게 메시지 보내기
    btnGetFriendsList.addEventListener("click", handleGetFriendsList); // 친구목록 가져오기
    btnSendMsgFriend.addEventListener("click", handleSendMsgFriend); // 친구에게 메시지 보내기

    // redirect 시 url 의 access_token, refresh_token 을 input 에 셋팅
    const access_token = new URLSearchParams(location.search).get("access_token");
    const refresh_token = new URLSearchParams(location.search).get("refresh_token");
    document.querySelector("input[name=access_token]").value = access_token;
    document.querySelector("input[name=refresh_token]").value = refresh_token;
  };

  init();
})();
