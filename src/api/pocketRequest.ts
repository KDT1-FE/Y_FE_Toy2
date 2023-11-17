const responseBody = (res: Response) => res.json();

const pocketRequest = {
  get: async (collection: string, chatIdPath?: string, params?: string) => {
    return await fetch(
      `${import.meta.env.VITE_POCKET_API}/${collection}/records${
        chatIdPath ? `${chatIdPath}` : ''
      }?perPage=1000${params ? `${params}` : ''}`,
      { cache: 'no-store' },
    ).then(responseBody);
  },

  post: async (collection: string, data: object, id?: string) => {
    console.log(
      `${import.meta.env.VITE_POCKET_API}/${collection}/records${
        id ? `/${id}` : ''
      }`,
    );
    return await fetch(
      `${import.meta.env.VITE_POCKET_API}/${collection}/records${
        id ? `/${id}` : ''
      }`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    ).then(responseBody);
  },

  patch: async (collection: string, id: string, data: object) => {
    return await fetch(
      `${import.meta.env.VITE_POCKET_API}/${collection}/records/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    ).then(responseBody);
  },

  delete: async (collection: string, id: string) => {
    return await fetch(
      `${import.meta.env.VITE_POCKET_API}/${collection}/records/${id}`,
      {
        method: 'DELETE',
      },
    );
  },
};

export default pocketRequest;
