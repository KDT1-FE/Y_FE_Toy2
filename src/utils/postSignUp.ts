import { apiHeader } from "./apiHeader";

export const postSignUp = (requestBody: {}, loading: void) => {
  fetch("https://fastcampus-chat.net/signp", {
    method: "POST",
    headers: apiHeader,
    body: JSON.stringify(requestBody)
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "User created") {
        console.log("회원가입 성공");
        loading;
      } else {
        console.log("회원가입 실패");
        alert(data.message);
        loading;
      }
    })
    .catch((error) => {
      console.error("오류 발생:", error);
      loading;
    });
};
