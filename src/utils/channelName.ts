export const splitChannelName = (name: string) => {
  const [title, category] = name.split('#');

  return {
    title,
    category,
  };
};

export const createChannelNameWithCategory = (
  name: string,
  category: string,
) => {
  return `${name}#${category}`;
};
