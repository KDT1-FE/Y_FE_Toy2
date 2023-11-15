import { Box, useRadio } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { categoryChannelState } from '../../recoil/channel.atom';

const ChannelRadio = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const [category, setCategory] = useRecoilState(categoryChannelState);

  const input = getInputProps({
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setCategory({ ...category, category: e.target.value });
    },
  });

  const checkbox = getRadioProps();

  return (
    <>
      <Box as="label">
        <input {...input} />
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
