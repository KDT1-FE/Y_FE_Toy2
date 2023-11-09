export const splitChatName = (name: string) => {
  const [title, category] = name.split('#');

  return {
    title,
    category,
  };
};
