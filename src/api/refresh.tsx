// 게임 진행 중 user정보를 가져올 때마다 



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
 
  
