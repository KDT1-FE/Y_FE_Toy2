import { Box, useRadio } from '@chakra-ui/react';
import React, { ChangeEvent, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { channelState } from '../../recoil/channel.atom';

const ChannelRadio = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const [categoryChannel, setCategoryChannel] = useRecoilState(channelState);

  const input = getInputProps({
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCategoryChannel({ ...categoryChannel, category: e.target.value });
    },
  });

  const checkbox = getRadioProps();

  useEffect(() => {
    // categoryChannel이 변경되면 onSelectCategory 호출
    props.onSelectCategory(categoryChannel.category);
  }, [categoryChannel]);

  return (
    <>
      <Box as="label">
        <input
          {...input}
          onClick={() => props.onSelectCategory(categoryChannel.category)}
        />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          color="black"
          _checked={{
            bg: props.customColor, // 커스텀 컬러 지정
            color: 'white',
            borderColor: props.customColor, // 커스텀 컬러 지정
          }}
          fontSize="xs"
          px="3"
          py="1"
          whiteSpace="nowrap"
          userSelect="none"
        >
          {props.children}
        </Box>
      </Box>
    </>
  );
};

export default ChannelRadio;
