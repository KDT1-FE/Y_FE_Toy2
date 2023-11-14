import { Box, HStack, useRadioGroup } from '@chakra-ui/react';
import { CATEGORIES } from '../../../constants/channel';
import CategoryRadio from './CategoryRadio';

const CategoryInput = () => {
  const options = CATEGORIES;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'category',
    defaultValue: '',
  });

  const group = getRootProps();

  return (
    <Box overflow="auto">
      <HStack {...group}>
        {options.map((option) => {
          const radio = getRadioProps({ value: option.value });
          return (
            <CategoryRadio key={option.name} {...radio}>
              {option.name}
            </CategoryRadio>
          );
        })}
      </HStack>
    </Box>
  );
};

export default CategoryInput;
