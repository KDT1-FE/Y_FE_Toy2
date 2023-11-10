import { Box, HStack, useRadioGroup } from '@chakra-ui/react';
import { CATEGORIES } from '../../../constants/channel';
import CategoryRadio from './CategoryRadio';

const CategoryInput = () => {
  const options = CATEGORIES;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'category',
    defaultValue: '기타',
  });

  const group = getRootProps();

  return (
    <Box overflow="auto">
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <CategoryRadio key={value} {...radio}>
              {value}
            </CategoryRadio>
          );
        })}
      </HStack>
    </Box>
  );
};

export default CategoryInput;
