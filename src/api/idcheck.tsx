export const idCheck = async (id) => {
  const result = await fetch('https://fastcampus-chat.net/check/id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      serverId: `${import.meta.env.VITE_FAST_KEY}`,
    },
    body: JSON.stringify({ id }),
  });
  const response = await result.json();
  const res = response.isDuplicated;
  console.log(res);
  return res ;
};
