(() => {
  /*
   *
   * GET 요청 ( JSON 리턴 )
   *
   */
  const handleBtnGet = () => {
    console.log("GET 요청 ( JSON 리턴 )");

    const ulGet = document.querySelector("#ulGet");

    let addHtml = "";
    let userId = "3";

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("GET 결과:", result);
        result.forEach((item) => {
          addHtml += '<li data-id="' + item.id + '">' + item.title + "</li>";
        });
        ulGet.innerHTML = addHtml;
      })
      .catch((error) => console.log("error", error));
  };

  /*
   *
   * POST 요청 ( json )
   *
   */
  const handleBtnPostJson = () => {
    console.log("POST 요청 ( json )");

    const ret = document.querySelector("#ret");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ title: "foo", body: "bar", userId: 1 });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        ret.innerHTML = result;
      })
      .catch((error) => console.log("error", error));
  };

  /*
   *
   * POST 요청 ( x-www-form-urlencoded )
   *
   */
  const handleBtnPostForm = () => {
    console.log("POST 요청 ( x-www-form-urlencoded )");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("title", "foo");
    urlencoded.append("body", "bar");
    urlencoded.append("userId", "1");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        ret.innerHTML = result;
      })
      .catch((error) => console.log("error", error));
  };

  /*
   *
   * init
   *
   */
  const init = () => {
    const btnGet = document.querySelector("#btnGet");
    const btnPostJson = document.querySelector("#btnPostJson");
    const btnPostForm = document.querySelector("#btnPostForm");

    btnGet.addEventListener("click", handleBtnGet);
    btnPostJson.addEventListener("click", handleBtnPostJson);
    btnPostForm.addEventListener("click", handleBtnPostForm);
  };

  init();
})();
