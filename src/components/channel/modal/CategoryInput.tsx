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
        {options.map((option, index) => {
          const radio = getRadioProps({ value: option.value });
          return (
            <CategoryRadio
              key={option.name}
              {...radio}
              isDisabled={index === 0}
            >
              {option.name}
            </CategoryRadio>
          );
        })}
      </HStack>
    </Box>
  );
};

export default CategoryInput;
