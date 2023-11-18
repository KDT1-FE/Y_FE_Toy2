<div align="center">

<img src="https://github.com/LeHiHo/FastMind/assets/37584686/6e7fe4ca-ff6d-4a4d-b572-20e799a8c2c7" width=300>

### 패스트캠퍼스 토이프로젝트2 한조팀의 FastMind 게임 💻 프론트엔드

</div>

<br/>

## 📝 프로젝트 소개

`FastMind`는 창의적이고 상호작용이 풍부한 웹 애플리케이션입니다. 이 프로젝트는 그림판과 채팅 기능을 통합하여 아래 두 가지 주요 방식으로 사용됩니다.  

1. 게임 모드: 사용자 중 한 명이 출제자가 되어, 퀴즈를 내고 관련된 그림을 그립니다. 그 후, 다른 참여자들이 그림을 바탕으로 퀴즈의 답을 맞추는 대화형 웹 게임입니다.
2. **협업 모드**: 사용자들은 그림판에 직접 그림을 그리며, 실시간으로 공유하고 채팅을 통해 아이디어를 교환합니다. 이 모드는 회의, 브레인스토밍, 또는 일반 대화에 이상적으로 활용됩니다.

게임 서버는 [이곳](https://github.com/seacrab808/Fastmind-server)을 클릭해 주세요.  
채팅 서버는 [이곳](https://github.com/GyoHeon/chat-back)을 클릭해 주세요.

TEST용 ID: ivegaeul  
TEST용 PASSWORD: ivegaeul

<br/>

## ✔️ 요구 사항

### 필수 구현 사항
- [x] `useState` 또는 `useReducer`를 활용한 상태 관리 구현
- [x] `Sass`, `styled-component`, `emotion`, `Chakra UI`, `tailwind CSS` 등을 활용한 스타일 구현
- [x] `react` 상태를 통한 CRUD 구현
- [x] 상태에 따라 달라지는 스타일 구현
- [x] `custom hook`을 통한 비동기 처리 구현
- [x] 유저인증 시스템(로그인, 회원가입) 구현
- [x] `jwt`등의 유저 인증 시스템 (로그인, 회원가입 기능)
- [x] 소켓을 이용한 채팅 구현

### 선택 구현 사항
- [x] `typescript`를 활용한 앱 구현

<br/>

## 🛠️ 기술 스택

### FrontEnd  

#### Language
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"> 

#### Development

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white) 
![Recoil](https://img.shields.io/badge/Recoil-007af4.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1NS4yMSA2MjMuOTEiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDp3aGl0ZX08L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im03NC42MiAyNzcuNDYgMS4yNC0uMTMgMzQuNzgtMy4yOC01My40Ny01OC42NkE5Ni40NyA5Ni40NyAwIDAgMSAzMiAxNTAuM0gzYTEyNS4zIDEyNS4zIDAgMCAwIDMyLjggODQuNTdaTTE3Ny4xMyAzNDdsLTM2IDMuNCA1My4zMiA1OC41MUE5Ni40MSA5Ni40MSAwIDAgMSAyMTkuNjMgNDc0aDI4LjkyYTEyNS4yOCAxMjUuMjggMCAwIDAtMzIuNzYtODQuNTdaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjUzLjY5IDIzMS42OGMtNi4zMy0zMS4zLTMwLjg5LTU0LjA5LTYyLjU3LTU4LjA3bC02LjM1LS43OWE0OS42MSA0OS42MSAwIDAgMS00My4zNS00OS4xM3YtMjBhNTIuNzUgNTIuNzUgMCAxIDAtMjguOTEtLjM2djIwLjM4YTc4LjU2IDc4LjU2IDAgMCAwIDY4LjY1IDc3LjgybDYuMzYuOGMyMy4yNCAyLjkyIDM0Ljc4IDIwIDM3LjgzIDM1LjFzLS45MyAzNS4zMi0yMS4yMiA0N2E3My44MSA3My44MSAwIDAgMS0zMC4wNiA5LjYybC05NS42NiA5YTEwMi40NSAxMDIuNDUgMCAwIDAtNDEuOCAxMy4zOEM5IDMzMi40NS00LjgxIDM2MyAxLjUyIDM5NC4yOXMzMC44OSA1NC4wOCA2Mi41NyA1OC4wNmw2LjM1LjhhNDkuNiA0OS42IDAgMCAxIDQzLjM1IDQ5LjEydjE4YTUyLjc1IDUyLjc1IDAgMSAwIDI4LjkxLjI2di0xOC4yNmE3OC41NSA3OC41NSAwIDAgMC02OC42NS03Ny44MWwtNi4zNi0uOGMtMjMuMjQtMi45Mi0zNC43OC0yMC4wNS0zNy44My0zNS4xMXMuOTMtMzUuMzIgMjEuMjItNDdhNzMuNjggNzMuNjggMCAwIDEgMzAuMDYtOS42M2w5NS42Ni05YTEwMi40NSAxMDIuNDUgMCAwIDAgNDEuOC0xMy4zOGMyNy42NS0xNi4wMiA0MS40LTQ2LjU0IDM1LjA5LTc3Ljg2WiIvPjwvc3ZnPg==&logoColor=white) 
![StyledComponents](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) 
![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)


#### CI/CD
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

#### Design
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

<br>

### Chatting BackEnd

#### Language
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

#### Framework
![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)


#### DB
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

#### Infra
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Mongoose](https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white)

#### CI/CD
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white) 
![Amazon EC2](https://img.shields.io/badge/Amazon%20EC2-FF9900.svg?style=for-the-badge&logo=Amazon-EC2&logoColor=white)

<br>

### Game BackEnd

#### Language
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

#### Framework
![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)

#### Infra
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)

#### CI/CD
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

<br/>

## 📚 주요 기능
<div align="center">
  <table>
    <tr align="center">
      <th>채팅/그림</th>
      <th>채팅/게임</th>
    </tr>
    <tr>      
      <td><img src="https://github.com/LeHiHo/FastMind/assets/134940630/589887ff-4530-484e-870e-29df2ec11271" alt="chatting/painting" width="370"></td>
      <td><img src="https://github.com/LeHiHo/FastMind/assets/134940630/98f4aa75-d96f-453d-8c3d-c51f26c1a129"alt="chatting/game" width="370"></td>      
    </tr>      
    <tr align="center">
      <th>1대1채팅</th>
      <th>리다이렉션</th>
    </tr>
    <tr>
      <td><img src="https://github.com/LeHiHo/FastMind/assets/134940630/f29dc190-4b3a-495e-be88-fa98cee49df9" alt="1:1chatting" width="370"></td>      
      <td><img src= "https://github.com/LeHiHo/FastMind/assets/134940630/d1babdca-960f-41e5-9588-9cc29ebbdd4e"alt="
redirection" width="370"></td>      
    </tr>
  </table>
</div>

## 🖌️ 프로젝트 아키텍처

<div align="center">
  
<img src="https://github.com/LeHiHo/FastMind/assets/37584686/1198325a-aefd-4749-a578-2f75e2ee2f18" />


</div>

<br/>

## 📂 폴더 구조
```
  📦src
 ┣ 📂api ➡️ API 요청관련 코드
 ┣ 📂assets/icons ➡️ 이미지 파일/아이콘
 ┣ 📂components ➡️ 재사용가능 코드
 ┃ ┣ 📂layout ➡️ 레이아웃 컴포넌트(ex. header, footer, navigator)
 ┃ ┗ 📂template ➡️ 특정 페이지에서 사용되는 컴포넌트
 ┣ 📂hooks  ➡️ Custom Hooks 관련코드
 ┣ 📂interfaces ➡️ TypeScript 인터페이스,타입 관련 코드
 ┣ 📂pages
 ┃ ┣ 📂lobby ➡️ 로비
 ┃ ┃ ┗ 📜gameLobby.tsx
 ┃ ┣ 📂login ➡️로그인
 ┃ ┃ ┣ 📜userJoin.tsx
 ┃ ┃ ┣ 📜userLogin.tsx
 ┃ ┃ ┗ 📜userLogout.tsx
 ┃ ┗ 📂room ➡️ 게임룸
 ┃ ┃ ┗ 📜gameRoom.tsx
 ┣ 📂provider ➡️ 전역상태관리 관련 코드
 ┃ ┣ 📜authContext.tsx
 ┃ ┗ 📜authProvider.tsx
 ┣ 📂router
 ┃ ┗ 📜MainRouter.tsx ➡️ 라우팅
 ┣ 📂states
 ┃ ┗ 📜atom.ts ➡️ recoil 관리 코드
 ┣ 📂util
 ┃ ┣ 📜checkNums.tsx
 ┃ ┗ 📜util.ts
 ┣ 📜App.tsx
 ┣ 📜constant.ts
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

<br/>

## 🧑🏻‍💻 팀 소개 및 역할
| 장호진 (FE & BE)  <br> 팀장 | 양재혁 (FE & BE) <br> 팀원 | 신하연 (FE) <br> 팀원 | 소유나 (FE & BE)  <br> 팀원 | 이교헌 멘토님 (BE) <br> 멘토님|
|:---------------------:|:-----------------------:|:---------------------:|:-----------------------:|:---------------------:|
| <img height="100" src="https://avatars.githubusercontent.com/leHiHo" width="100"/> | <img height="100" src="https://avatars.githubusercontent.com/yangjaehyuk" width="100"/> | <img height="100" src="https://avatars.githubusercontent.com/gkdus2217" width="100"/> | <img height="100" src="https://avatars.githubusercontent.com/seacrab808" width="100"/> | <img height="100" src="https://avatars.githubusercontent.com/GyoHeon" width="100"/> |
| [leHiHo](https://github.com/leHiHo) | [yangjaehyuk](https://github.com/yangjaehyuk) | [gkdus2217](https://github.com/gkdus2217) | [seacrab808](https://github.com/seacrab808) | [GyoHeon](https://github.com/GyoHeon) |
|<ul><li>인증ㆍ인가</li><li>jwt토큰 재발급</li><li>로그인유지ㆍ리다이렉션</li><li>초기설정ㆍ폴더구조설계</li><li>게임 로직ㆍ소켓ㆍ서버 구현</li><li>프론트엔드ㆍ백엔드 배포</li></ul> | <ul><li>REST API 연결</li><li>서버 소켓 연결</li><li>게임 서버 구현</li><li>게임 로직 구현</li><li>게임방 유저 목록 구현</li><li>방 만들기 구현</li><li>폴링 로직 구현</li><li>온라인 유저 목록 구현</li></ul> | <ul><li>채팅 소켓 연결</li><li>1대1 채팅 구현</li><li>게임방 채팅 구현</li><li>검색 기능 구현</li><li>페이지네이션</li><li>로비 및 헤더 UI</li><li>방 목록 정렬</li></ul> | <ul><li>그림판 구현</li><li>그림판 소켓 연결</li><li>게임 서버 구현</li><li>게임 서버 배포</li><li>게임방 UI</li></ul>  | <ul><li>채팅 서버 구현</li><li>채팅 서버 배포</li></ul> |

<br/>

## ✍️ 회고 

### 장호진  
프로젝트 초기에 2주만에 게임을 만들 수 있을까라는 생각이 들었지만, 유나님은 그림판 구현경험이있고, 재혁님은 게임 구현경험, 하연님은 웹소켓 경험이 있어서 믿고 열심히 할 수 있었습니다!!  
재혁님 유나님과 함께한 게임로직, 백엔드 소켓 로직, 백엔드 배포를 수행하면서 기존 프론트엔드에서 경험하지 못했던것들을 경험 할 수 있어서 좋았습니다.  
하연님의 전문적인 퍼블리싱으로 초기 UI를 엄청나게 업그레이드 시켜주셔서 구현하며서 이런게 현업의 감각이구나 라는걸 느꼈습니다.  
4명임에도 불구하고 완성도높은 결과물을 위해 다들 새벽까지 개발 하시느라 고생하셨습니다!🏹  

### 양재혁  
이전에 SockJS와 Stomp를 이용하여 웹 게임 구현 경험이 있어 수월할 줄 알았으나 게임 로직을 구현하면서 백엔드 팀원이 없어 게임 개발에 난항을 겪었습니다.  
결국 백엔드 공부도 따로 하며 직접 백엔드를 구현하고 배포하게 되었습니다.  
이번 프로젝트에서 저희 팀원들 모두가 열심히 해주셔서 감사합니다.  
2주 안에 채팅과 게임 솔직히 못 할 줄 알았는데 우리 팀원들 대단하신 것 같습니다!  
다음 프로젝트도 이번 팀처럼 열정적이고 능력 있는 분들이랑 하고 싶습니다 ^~^  

### 소유나  
캐치마인드에 진심이었지만 서비스가 종료되어서 저희가 직접 만들기로 했다 ^!^ 🏹  
이번 과제 특성 상 역할 분배가 어려워서 조금 아쉬웠지만 이번 기회로 리액트를 확실하게 배운 것 같고 소켓과 백엔드까지 관심을 갖게 되었다. 🎇  
컨셉충인 나는 내가 좋아하는 것을 만드는게 조금 더 욕심과 열정을 갖고 만들 수 있다는 것을 다시 깨달았다. 😉  
이번 프로젝트에서 가장 많이 얻어 가는 것은 공부 의지와 욕심이다❗    
모두 잠도 안 자고 매일 새벽까지 밤 새서 기능 구현에 힘썼는데, 그런 열정을 다음 프로젝트에 계속 이어나갈 수 있을 것 같다. 💪   
주어진 과제 이상으로 게임 로직과 백엔드 구현까지 경험해서 정말 뜻깊은 2주였다. 🐤  

### 신하연  
지나고 보니 정신없이 달려온 2주였던 것 같습니다.   
처음에 역할 분배를 했지만, 역할 분배가 어려워 난항을 겪었고, 정해진 역할 분배와 다르게 기능을 구현한 감이 있어서 그 부분은 아쉽습니다.   
초기 디자인 UI를 피그마로 제작했으나, 뜻하지 않게 디자인과 다르게 구현된 부분도 있어 디자이너로의 욕심을 내려놓는 법을 조금이나마 배운 것 같습니다.  
다들 새벽, 주말 가리지 않고 열심히 작업했으며, 서로 화이팅하려는 분위기를 만들려고 조원들 모두가 힘썼습니다.  
배포 직전 채팅 소켓 오류 디버깅으로 꽤나 골치를 썩었고, 그런 디버깅을 하면서 소켓 연결과 리액트에 이해가 높아진 것 같아 많이 배웠다는 생각이 듭니다.  
모두 고생하셨습니다.  

<br>


## 📆 기간
  `2023.11.06 ~ 2023.11.17`
