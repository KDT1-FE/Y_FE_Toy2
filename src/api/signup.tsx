export const signup = async (
  id: string,
  password: string,
  name: string,
  character: string,
) => {
  const data = {
    id: id,
    password: password,
    name: name,
    picture: character,
  };

  console.log(data);
  try {
    const response = await fetch('https://fastcampus-chat.net/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        serverId: `${import.meta.env.VITE_FAST_KEY}`,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};
