import { Box, useRadio } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { channelState } from '../../../recoil/channel.atom';
import { ChangeEvent } from 'react';

const CategoryRadio = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const [channel, setChannel] = useRecoilState(channelState);

  const input = getInputProps({
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setChannel({ ...channel, category: e.target.value });
    },
  });
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        fontSize="xs"
        px={3}
        py={1}
        whiteSpace="nowrap"
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default CategoryRadio;
