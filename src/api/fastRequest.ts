const responseBody = (res: Response) => {
  return res.json();
};

const fastRequest = {
  searchUserInfo: async (userId: string, accessToken: string) => {
    return await fetch(`https://fastcampus-chat.net/user?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        serverId: import.meta.env.VITE_FAST_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(responseBody);
  },

  searchAllChat: async () => {
    return await fetch('https://fastcampus-chat.net/chat/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        serverId: import.meta.env.VITE_FAST_KEY,
      },
    }).then(responseBody);
  },

  createChat: async (data: object, accessToken: string) => {
    return await fetch('https://fastcampus-chat.net/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        serverId: import.meta.env.VITE_FAST_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then(responseBody);
  },

  joinChat: async (data: object, accessToken: string) => {
    return await fetch('https://fastcampus-chat.net/chat/participate', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        serverId: import.meta.env.VITE_FAST_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then(responseBody);
  },
};

export default fastRequest;
