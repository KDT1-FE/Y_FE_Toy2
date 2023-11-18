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

  searchChat: async (chatId: string, accessToken: string) => {
    return await fetch(
      `https://fastcampus-chat.net/chat/only?chatId=${chatId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          serverId: import.meta.env.VITE_FAST_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ).then(responseBody);
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

  leaveChat: async (chatId: string, accessToken: string) => {
    return await fetch('https://fastcampus-chat.net/chat/leave', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        serverId: import.meta.env.VITE_FAST_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ chatId }),
    }).then(responseBody);
  },
};

export default fastRequest;
