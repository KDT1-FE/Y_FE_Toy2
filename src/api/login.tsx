export const login = async (id, password) => {
  const data = {
    id: id,
    password: password,
  };
  try {
    const response = await fetch('https://fastcampus-chat.net/login', {
      method: 'POST',
      headers: {
        serverId: `${import.meta.env.VITE_FAST_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      const errorJson = await response.json();
      console.error('Login failed:', errorJson);
      return { error: '아이디와 비밀번호를 다시 확인해주세요.' };
    }
  } catch (error) {
    console.error('실패:', error);
    return { error: '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' };
  }
};


