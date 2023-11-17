<div align="center">
  <img src="https://github.com/pepero-1/liar-game/assets/92326949/3ce229ec-1e6d-401c-9c58-fb292abff6fb" width="100" height="100" />
  <h1>LIAR GAME</h1>
  <p align="center">
  <a href="https://liar-game-pepero.netlify.app/">
    <img src="https://img.shields.io/badge/LIAR GAME-gray?style=for-the-badge&logoColor=white" alt="배포 사이트"/>
  </a>
  <a href="https://github.com/pepero-1/liar-game">
    <img src="https://img.shields.io/badge/배포 repository-212125?style=for-the-badge&logoColor=white" alt="배포 레포"/>
  </a>
</p>
</div>

#### 📅 개발 기간 : `23.11.06 ~ 23.11.17`

## 💁‍♀️ 프로젝트 소개

`LIAR GAME` 은 주어진 제시어에 대해 거짓말을 하고 있는 사람을 찾는 게임인 소켓 기반 통신 앱입니다. <br>
채팅방에 입장하면 라이어를 제외한 인원들에게만 제시어가 주어집니다.<br>
참가자들은 채팅으로 대화하며, 투표를 통해 제시어를 아는 척 거짓말하는 라이어를 찾습니다.

<br>
<br>

<details>
<summary>'라이어 게임' 테스트 계정 정보</summary>
<div>

| 아이디 | 비밀번호 |
| ------ | -------- |
| 12345  | 12345    |

</div>
</details>
</br>

> 서비스를 구경하고 싶으시다면 위의 테스트 계정 정보로 로그인하거나 회원 가입 후 사용하실 수 있습니다.

</br>

## 👪 빼빼로조 팀원 소개

<table>
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/2YH02" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/125336070?v=4" alt=
        "이용훈 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/suyeonnnnnnn" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/92326949?v=4" alt="박수연 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/IAMISTP" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/137421610?v=4" alt="박혜민 프로필" />
      </a>
    </td>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/joanShim" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/35457850?v=4"alt="심정아 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/suehub" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/111065848?v=4"alt="이연수 프로필" />
      </a>
    </td>
  </tr>
  <tr> 
    <td align="center">
      <a href="https://github.com/2YH02" target="_blank">
        이용훈<br />
        Frontend & 팀장
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/suyeonnnnnnn" target="_blank">
        박수연<br />
        Frontend
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/IAMISTP" target="_blank">
        박혜민<br />
        Frontend
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/joanShim" target="_blank">
        심정아<br />
        Frontend
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/suehub" target="_blank">
        이연수<br />
        Frontend
      </a>
    </td>
  </tr>
</table>
<br>

## 💻 팀원 별 구현 사항

|  이름  | 역할 |                 <div align="center">개발 내용</div>                 |
| :----: | :--: | :-----------------------------------------------------------------: |
| 이용훈 | 팀장 | 게임 생성 </br> 유저 초대 </br> 초대 알림 </br> 프로젝트 전체 관리  |
| 박수연 | 팀원 |              회원가입</br>로그인</br>프로필 수정</br>               |
| 박혜민 | 팀원 |                전체 채팅 </br> 게임 목록 조회 </br>                 |
| 심정아 | 팀원 |           게임 채팅 </br> 라이어 투표 </br> 전체 UI 관리            |
| 이연수 | 팀원 | 게임 시작 </br> 키워드 및 카테고리 랜덤 지정 </br> 라이어 랜덤 지정 |

</br>

### ✅ 필수 구현 사항

- [x] `useState` 또는 `useReducer`를 활용한 상태 관리 구현
- [x] `Sass`, `styled-component`, `emotion`, `Chakra UI`, `tailwind CSS` 등을 활용한 스타일 구현
- [x] `react` 상태를 통한 CRUD 구현
- [x] 상태에 따라 달라지는 스타일 구현
- [x] `custom hook`을 통한 비동기 처리 구현
- [x] 유저인증 시스템(로그인, 회원가입) 구현
- [x] `jwt`등의 유저 인증 시스템 (로그인, 회원가입 기능)
- [x] 소켓을 이용한 채팅 구현

</br>

## 🛠️ 주요기능 요약

### ⭐ 라이어 게임

- 사용자들과 실시간 채팅을 통해 라이어 게임을 할 수 있도록 게임 로직을 만들었습니다.

### ⭐ 메인 페이지 게임방 리스트, 정보 실시간 확인

- 메인 페이지에서 게임이 새로 만들어지는지, 게임이 진행 중인지 대기 중인지, 사용자가 입장하고 퇴장하는 모든 것이 실시간으로 모든 사용자에게 공유됩니다.

### ⭐ 메인페이지 메인 채팅 기능, 모든 사용자 확인, 프로필 확인 및 수정

- 메인 페이지에서는 모든 사용자가 하나의 채팅방으로 전체 채팅을 할 수 있습니다.
- 메인 페이지에서 모든 사용자 리스트 확인 및 프로필 수정이 가능합니다.

### ⭐ 회원가입, 로그인 기능 및 인증, 404페이지

- 회원가입과 로그인을 할 수 있습니다. (이미지 추가 가능, 유효성 검사)
- 인증이 안된 사용자가 다른 페이지로 접근할 시 로그인 페이지로 이동됩니다.
- 구현 안 된 주소로 이동 시 404페이지로 이동합니다.

### ⭐ 게임 생성 및 사용자 초대

- 게임 방을 생성할 수 있고 원하는 사용자를 초대할 수 있습니다.
- 초대된 사용자는 실시간으로 화면에 초대 메시지지 창이 보이고 수락 시 게임방으로 입장합니다.
  </br> </br>

## 💻 개발 스택

### 🌙 환경

<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### 🌙 개발

<img src="https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/recoil-f26b00?style=for-the-badge&logo={svg가 변환된텍스트})">

### 🌙 소통

<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
<br>
<br>

## 🗂 디렉토리 구조

```
📦src
 ┣ 📂assets
 ┃ ┣ 📜bg.png
 ┃ ┗ 📜logo1.png
 ┣ 📂components
 ┃ ┣ 📂Game
 ┃ ┃ ┣ 📂GameChat
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂GameStart
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Timer
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂Vote
 ┃ ┃ ┃ ┣ 📜CalculateVote.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Login
 ┃ ┃ ┣ 📂LoginForm
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂SignUpModal
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Main
 ┃ ┃ ┣ 📂CreateGameModal
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂GameCard
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂GameLists
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂UserConfigModal
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂common
 ┃ ┃ ┣ 📂Loader
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂ToastNotice
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂UserCard
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📜ChatBubble.tsx
 ┃ ┃ ┣ 📜MyChatBubble.tsx
 ┃ ┃ ┗ 📜SystemChat.tsx
 ┣ 📂data
 ┃ ┗ 📜category.json
 ┣ 📂firebase
 ┃ ┗ 📜firebase.ts
 ┣ 📂hooks
 ┃ ┣ 📜useAuth.ts
 ┃ ┣ 📜useFetch.ts
 ┃ ┣ 📜useFireFetch.ts
 ┃ ┣ 📜useInput.ts
 ┃ ┗ 📜useSocket.ts
 ┣ 📂pages
 ┃ ┣ 📂Game
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Login
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂NotFound
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂recoil
 ┃ ┗ 📂atoms
 ┃ ┃ ┣ 📜authState.ts
 ┃ ┃ ┗ 📜userState.ts
 ┣ 📂socket
 ┃ ┗ 📜socket.ts
 ┣ 📂theme
 ┃ ┗ 📜index.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

## 🐼 시연 영상

### 1. 회원가입, 로그인, 메인페이지, 프로필 변경

- 회원가입, 로그인할 수 있고 메인페이지에서 사용자의 프로필을 변경할 수 있습니다.

https://github.com/pepero-1/liar-game/assets/125336070/68bb00e9-01dc-43eb-b1a2-cd51e8d142fc

### 2. 게임 생성, 친구 초대, 유저 입장 퇴장 실시간

- 게임을 생성하면서 게임 사용자 수 설정과, 친구초대를 할 수 있습니다.
- 초대받으면 화면에 초대메시지가 보이고, 수락 시 게임방으로 이동하고, 사용자의 입장 퇴장이 실시간으로 보입니다.

https://github.com/pepero-1/liar-game/assets/125336070/4799414e-e679-4734-96fa-0afaf508fa22

### 3. 게임 플레이

- 사용자가 게임방에 입장하면 메인화면에서 실시간으로 사용자 수가 변하는 게 보입니다.
- 게임 시작 시 키워드가 제공되며 사용자의 순서가 무작위로 바뀌면서 개인 발언을 할 수 있는 시간으로 바뀝니다.
- 개인 발언이 끝나면 40초간 자유 채팅을 할 수 있는 시간을 주고 끝이 나면 투표버튼이 활성화되고, 투표할 수 있게 됩니다.
- 투표가 끝나면 결과가 화면에 표시됩니다.

https://github.com/pepero-1/liar-game/assets/125336070/88665f9d-23a6-4637-a45d-141d2ccd642a
