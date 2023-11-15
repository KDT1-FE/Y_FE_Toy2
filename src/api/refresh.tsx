// 게임 진행 중 
// 채팅 메시지를 주고 받을 때 웹소켓 통신하는 모든 시간에 ???
// 채팅방 내에서 통신 401 fail 일 때마다 refreshToken 함수를 실행해서 토큰 재발급 > 저장하도록 
// 
// user 정보를 가져올 때마다 log in한 상태의 유저 정보를 가져옴???? 
// userId를 가져오는 경우: 



export const getNewRefreshToken = async () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refsh_token");

    try {
        const response = await fetch('https://fastcampus-chat.net/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            serverId: `${import.meta.env.VITE_FAST_KEY}`,
          },
          body: JSON.stringify(refreshToken),
        });
    
        const json = await response.json();
        const res = json.data;
        return res;
    
      } catch (error) {
        console.error('회원가입 실패:', error);
        throw error;
      }
}
 
  
