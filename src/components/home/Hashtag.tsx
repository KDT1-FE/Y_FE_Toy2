import React from 'react';
import Tag from '../../styles/home/Hashtag.styled';

function Hashtag({ hashtag }: { hashtag: string }) {
  return <Tag>#{hashtag}</Tag>;
}

export default Hashtag;
