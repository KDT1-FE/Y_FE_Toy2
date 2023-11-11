// // Chating.tsx

// import React, { useState } from 'react';
// import ChatUserSelection from './ChatUserSelection'; // ChatUserSelection 컴포넌트 경로에 맞게 수정

// export default function Chating() {
//   const [showChatUserSelection, setShowChatUserSelection] = useState(false);

//   // 사용자 정보를 가져오는 함수 (액세스 토큰 사용)
//   const getLoggedInUserInfo = async () => {
//     // 액세스 토큰을 사용하여 사용자 정보를 가져옵니다.
//     // 사용자 정보를 설정하고 반환하도록 구현해야 합니다.
//   };

//   // 더 많은 상태 및 함수를 설정할 수 있습니다.

//   return (
//     <main>
//       <div>채팅 페이지</div>
//       <button onClick={() => setShowChatUserSelection(true)}>채팅 생성</button>

//       {showChatUserSelection && (
//         <ChatUserSelection
//           users={users} // 사용자 목록을 설정
//           onUserSelect={(user) => {
//             // 선택한 사용자를 처리
//           }}
//           createChat={async (chatName, usersList, isPrivate) => {
//             // 채팅 생성 로직을 구현
//             try {
//               // 액세스 토큰을 사용하여 서버에 채팅 생성 요청을 보냅니다.
//               const response = await fetch('https://fastcampus-chat.net/chat', {
//                 method: 'POST',
//                 body: JSON.stringify({
//                   name: chatName,
//                   users: usersList,
//                   isPrivate,
//                 }),
//                 headers: {
//                   'content-type': 'application/json',
//                   Authorization: 'Bearer <accessToken>', // 여기에 액세스 토큰을 넣어주세요.
//                   serverId: 'test',
//                 },
//               });
//               const data = await response.json();
//               console.log(data);
//               // 채팅 생성 후 추가 작업을 수행할 수 있습니다.
//             } catch (error) {
//               console.error(error);
//             }
//           }}
//         />
//       )}
//     </main>
//   );
// }
