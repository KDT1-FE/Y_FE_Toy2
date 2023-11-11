export const checkChannelName = (name: string) => {
  const [title] = name.split('#');

  if (title.length === 0) return false;
  return true;
};

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
  const channelName = `${name}#${category}`;
  return channelName.trim();
};
