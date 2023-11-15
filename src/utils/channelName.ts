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
  let filteredChannels =
    title !== ''
      ? channels.filter((channel) => channel.name.split('#')[0].includes(title))
      : channels;

  if (selectedCategory !== '' && selectedCategory !== '전체') {
    filteredChannels = filteredChannels.filter((channel) => {
      const channelCategory = channel.name.split('#')[1];
      return channelCategory === selectedCategory;
    });
  }

  return filteredChannels;
  // if (selectedCategory !== '' && selectedCategory !== '전체') {
  //   filteredChannels = filteredChannels.filter((channel) => {
  //     const channelCategory = channel.name.split('#')[1];
  //     return channelCategory === selectedCategory;
  //   });
  // }

  // return filteredChannels;
};
