# smartalk

> 실시간 채팅 서비스 <br>
> 개발기간: 2023.11.08~2023.11.16

**[smartalk 바로가기](https://smartalk.vercel.app/)**

**[smartalk 깃허브 바로가기](https://github.com/Chatting-App-FE/Chatting-App-FE)**

<br>

# 🔖 프로젝트 소개

smartalk은 실시간 대화를 가능하게 하는 효과적인 채팅 플랫폼입니다.

사용자들은 손쉽게 채팅방을 생성하고 다른 사용자들을 초대하여 실시간으로 의견을 공유할 수 있습니다
smartalk은 사용자들의 효율적인 커뮤니케이션을 지원합니다

테스트 계정

- id : user1
- password : userPassword

<br>

# 💻 기능 소개

### 채팅 페이지

![소켓-메시지](https://github.com/Chatting-App-FE/Chatting-App-FE/assets/81469686/0ea6c86b-3c3b-4bf8-a768-bb3f23279af4)

- 채팅 리스트
  이전 대화 목록을 불러오고 실시간으로 사용자가 보낸 메시지를 띄웁니다
  이때 실시간 메시지가 보내질 때 , 이전 대화 목록이 많을 때 스크롤이 하단으로 이동하도록 제어하였습니다
  또한 채팅 메시지 input값이 빈 값일 땐 go 버튼을 disabled 시켰습니다
- 초대하기, 나가기
  이미 참여한 사람은 제외한 나머지 전체 유저를 불러와 초대할 수 있습니다.
  초대 이후에는 실시간으로 참여 목록을 볼 수 있습니다.
  채팅방 내 사용자가 초대되거나 나가면 toast 알람을 띄웠습니다
  나간 이후에는 나의 채팅방에서 삭제하며, 채팅방 내에서는 나간 사람이 실시간으로 사라집니다.

![invite_leave.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/3ef8dbd9-414c-4cf5-813d-32ecb943cc67/1de2f15a-de15-4245-9112-cf00ef75b432/invite_leave.gif)

- 초대 모달
  이미 참여한 사람은 제외한 나머지 전체 유저를 불러와 초대할 수 있습니다.
  socket.io를 이용해서 초대 이후에는 실시간으로 참여 목록을 볼 수 있습니다.

### 사이드바 & toast

- 새로운 채팅방 추가 toast
  ![inviteToast.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/3ef8dbd9-414c-4cf5-813d-32ecb943cc67/1423fe0f-5c35-4792-872b-5407cd12fe0c/inviteToast.gif)

서버에 **새로운 채팅방이 개설**되거나, **타인에게 초대**를 받은 경우에도 'AA방이 추가되었습니다.’라는 toast를 띄웁니다.

- 나의 채팅방
  React-Query, socket.io를 사용해 참여하기, 초대하기, 나가기를 감지하고 실시간으로 나의 채팅방을 불러옵니다.

<br>

<br>

### 회원가입

![join](https://github.com/Chatting-App-FE/Chatting-App-FE/assets/81469686/af92d870-d3ab-4ffd-9732-496ccb2346bd)

react-hook-form을 이용하여 id,password,name 모두 유효성 검사를 진행하고 id는 중복 확인 버튼을 통해 중복된 아이디를 체크하였습니다
중복확인과 유효성 검사를 모두 마친 후 백엔드에게 사용자 정보를 post하는 로직으로 구현하였습니다

<br>
<br>

### 채팅방 목록 / 채팅방 만들기
![Nov-16-2023 23-50-16](https://github.com/Chatting-App-FE/Chatting-App-FE/assets/123650056/7806a998-0f81-4883-b8dc-2f0654ce9a93)

- 채팅방 이름을 #을 기준으로 나누어 제목과 카테고리로 분리하였습니다. 이를 통해, 이름과 카테고리로 검색이 가능하게 만들었습니다.
- react query를 사용하여 채팅방 목록과 모달 내부의 유저 리스트를 캐싱하였고, 채팅방을 만들면 전체 채팅방 목록을 다시 받아오게 하였습니다.

<br>
<br>

### 로그인 하기

[smartalk - 개인 - Microsoft Edge 2023-11-17 10-05-13.mp4](https://prod-files-secure.s3.us-west-2.amazonaws.com/3ef8dbd9-414c-4cf5-813d-32ecb943cc67/5a6787dc-794c-4bc7-b3db-c17d2c4c2f55/smartalk_-_%EA%B0%9C%EC%9D%B8_-_Microsoft_Edge_2023-11-17_10-05-13.mp4)

- 로그인 시 access & refreshToken을 이용하여 추후 모든 api 연동 및 소켓 등의 사용에 interceptor를 활용한 axios 비동기 통신 방법을 이용해 진행했습니다.
- 유효성 검증을 통해, token 값이 존재하지 않는다면 로그인 페이지로 라우팅되고, 만료기간이 지나게 되면 자동으로 토큰값을 갱신해 줍니다.

# 🔨기술 스택

|            | Stack                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 언어       | <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 디자인     | <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 라이브러리 | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white"> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"> <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white"> <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white"> <img src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white"> |
| 협업툴     | <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 개발 환경  | <img src="https://img.shields.io/badge/vscode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">                                                                                                                                                                                                                                                                                                                                              |

<br>

# 필수 구현 사항

- `useState` 또는 `useReducer`를 활용한 상태 관리 구현
  - useState, recoil을 활용한 상태 관리 구현
- `Sass`, `styled-component`, `emotion`, `Chakra UI`, `tailwind CSS` 등을 활용한 스타일 구현
  - Chakra UI를 활용한 스타일 구현
- `react` 상태를 통한 CRUD 구현
  - ( create - 채팅방 생성 , read - 채팅방 조회 , update - 채팅방에 유저 초대하기 , delete - 채팅방에서 유저 나가기)
- 상태에 따라 달라지는 스타일 구현
  - private 상태에 따라 달라지는 채팅방 스타일 ( 사이드바 )
  - 카테고리에 따라 달라지는 채팅방 스타일
  - 회원가입시 아이디 중복 확인 여부에 따라 달라지는
- `custom hook`을 통한 비동기 처리 구현
  - hooks 폴더에 비동기 처리를 위한 custom hook 존재
- 유저인증 시스템(로그인, 회원가입) 구현
  - 로그인, 회원가입 구현 완료
- `jwt`등의 유저 인증 시스템 (로그인, 회원가입 기능)
  - 유저 인증 시스템 구현 완료
- 소켓을 이용한 채팅 구현
  - 소켓을 이용한 채팅 구현 완료

<br>

# 📘Convention

- [**commit convention**](https://www.notion.so/commit-convention-1a7fbb21155346fa9afecb1805832d71?pvs=21)
- [pull request](https://www.notion.so/pull-request-71b1f1b736e249c4bdef7aa8cb17c5af?pvs=21)
- [branch](https://www.notion.so/b1dcf11b05064f2d876339590fdc9ff6?pvs=21)
- [issue](https://www.notion.so/Issue-label-7fd9b28e99874534904b68d41409bb7b?pvs=21)

<br>

# 🙋‍♀️Contributors

|                                                                 <img src="https://avatars.githubusercontent.com/u/81469686?v=4" width="150px" />                                                                 |                                                     <img src="https://avatars.githubusercontent.com/u/38286505?v=4" width="150px" />                                                      |                                                                    <img src="https://avatars.githubusercontent.com/u/123650056?v=4" width="150px" />                                                                    |                                                                                  <img src="https://avatars.githubusercontent.com/u/139188760?v=4" width="150px" />                                                                                  |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                     FE: [박가현](https://github.com/gahyuun)                                                                                     |                                                                       FE: [최재훈](https://github.com/zoeyourlife)                                                                        |                                                                                       FE: [이재준](https://github.com/Gaoridang)                                                                                        |                                                                                                      FE: [박은영](https://github.com/SKY-PEY)                                                                                                       |
| -회원가입<br>-아이디 중복 체크<br>-실시간 메세지 수신/송신 구현<br> -이전 채팅 목록 보여주기 구현<br>-채팅 리스트 스크롤 제어<br>-채팅방에 참가하거나 나간 사용자<br>실시간으로 보여주기 구현<br> -스켈레톤 구현 | -로그인 구현 (JWT 토큰 이용 및 interceptor 설정<br> - 전체 유저 목록 조회 <br> - 카테고리 컨테이너 구현 및<br> 슬라이드 기능 <br> - 카테고리 목록 선택 시<br>필터 기능을 통한 목록 렌더링 | -전체 채팅 목록<br>-서버 내 모든 채팅 및 내가 속한 채팅 리스트 보여주기 <br>-채팅방 클릭시<br>해당 채팅방 이동 <br>-채팅방 이름과 카테고리로 검색하기<br>채팅방 생성<br>-이름과 카테고리 설정<br>-나를 제외한 인원 추가 | 채팅 참여 목록 sidebar<br>-socket.io로 실시간 참여 유저 목록 구현<br>-초대, 나가기, 참여하기<br>-나의 채팅방 sidebar<br>-실시간 내 채팅방 불러오기 구현<br>-메인 화면에서 새로운 채팅방 추가 toast알림 <br> 메인화면에서 카드 클릭 시 참여하기 구현 |

<br>

# 🤲느낀 점

### 가현

- 소켓을 처음 사용해보았고 그 과정 속에서 어려움도 있었지만 팀원들과 다양한 의견을 나누고 서로 협업하며 문제들을 해결할 수 있었습니다. 또한 개발 기간이 짧은 만큼 빠른 기간 내 성장할 수 있었던 것 같습니다

### 재준

- 협업을 하면서 다양한 문제를 마주할 수 있었고, 함께 그 과정을 해결해나가는 순간이 재미있었습니다. 처음엔 여유롭다고 생각했던 프로젝트가 생각보다 오래 걸려서 추가적으로 해보고 싶었던 기능을 많이 못해서 아쉽습니다. 다음에는 조금 더 효율적이고 빠르게 문제를 해결해서 더 완성도 있는 프로젝트를 해내고 싶습니다.

### 재훈

- 오랜만에 해본 개발 프로젝트여서, 처음에 많이 버벅거렸지만 팀원들과 소통하면서, PR을 보고 배워나가며 다시 개발의 감을 찾은 프로젝트였습니다. 또한 구현해본 적 없던 기능을 구현하면서 앞으로 있을 프로젝트에 대한 자신감도 얻었습니다.

### 은영

- 백엔드와의 협업 프로젝트 이전에 간단히나마 백엔드와의 통신을 접해보고, 사용해보지 않았던 socket.io와 react-query 등, 기타 라이브러리도 직접 사용해보며 단기간에 배울 수 있었던 뜻 깊은 시간이었습니다. 또, 이전 프로젝트와 다른 새로운 팀원분들과 또 다른 새로운 방법으로 프로젝트하는 게 생각보다 훨씬 색달라 재밌었고 정말 좋은 경험으로 느껴졌습니다. 그리고 서버 에러를 경험하며 나의 코드가 문제인지 서버 또는 백엔드 코드의 문제인지 구분하는 방법을 터득하게 된 것 같아 뿌듯하기도 합니다.
