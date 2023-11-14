import { Channel } from '../@types/channel';

export const checkChannelName = (name: string) => {
  if (name.length === 0) {
    return { isValid: false, errorMessage: '채널명을 입력하세요.' };
  } else if (name.includes('#')) {
    return {
      isValid: false,
      errorMessage: '채널명에 #을 포함할 수 없습니다.',
    };
  }

  return { isValid: true, errorMessage: '' };
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

export const filterChannels = (
  title: string,
  selectedCategory: string,
  channels: Channel[],
) => {
  if (title === '' && selectedCategory === '') return channels;

  const filteredByTitle = channels.filter((channel) => {
    console.log(title);
    return channel.name.split('#')[0].includes(title);
  });

  return filteredByTitle.filter((channel) => {
    const { category } = splitChannelName(channel.name);
    return category === selectedCategory;
  });
};
