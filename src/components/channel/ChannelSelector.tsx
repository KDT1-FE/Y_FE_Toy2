import { Box, Flex, HStack, useRadioGroup } from '@chakra-ui/react';
import React from 'react';
import { CATEGORIES, CATEGORY_COLOR_SCHEMES } from '../../constants/channel';
import ChannelRadio from './ChannelRadio';
import ScrollContainer from 'react-indiana-drag-scroll';

const ChannelSelector = ({ onSelectCategory }: any) => {
  const options = CATEGORIES;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'Category',
    defaultValue: '',
  });

  const group = getRootProps();

  return (
    <>
      <Flex>
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          bg="#F4F4F4"
          w={920}
          mt="4"
          mb="4"
          color="black"
          border="1px solid #cbcbcb"
          borderRadius="4"
          boxShadow="md"
          p="4"
          overflow="auto"
        >
          <ScrollContainer className="scroll-container">
            <HStack {...group} align="center" spacing={4} mb="1">
              {options.map((option) => {
                const radio = getRadioProps({ value: option.value });
                return (
                  <ChannelRadio
                    key={option.name}
                    {...radio}
                    customColor={CATEGORY_COLOR_SCHEMES[option.name]}
                    onSelectCategory={onSelectCategory}
                  >
                    {option.name}
                  </ChannelRadio>
                );
              })}
            </HStack>
          </ScrollContainer>
        </Box>
      </Flex>
    </>
  );
};

export default ChannelSelector;
