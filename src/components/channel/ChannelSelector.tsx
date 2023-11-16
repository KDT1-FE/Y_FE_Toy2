import { Box, Flex, Grid, HStack, useRadioGroup } from '@chakra-ui/react';
import { CATEGORIES, CATEGORY_COLOR_SCHEMES } from '../../constants/channel';
import ChannelRadio from './ChannelRadio';
import ScrollContainer from 'react-indiana-drag-scroll';

const ChannelSelector = () => {
  const options = CATEGORIES;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'Category',
    defaultValue: '',
  });

  const group = getRootProps();

  return (
    <>
      <Grid>
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          bg="#F4F4F4"
          width="100%"
          mt="4"
          mb="4"
          color="black"
          border="1px solid #cbcbcb"
          borderRadius="4"
          boxShadow="md"
          p="4"
          overflow="hidden"
        >
          <ScrollContainer className="scroll-container">
            <HStack {...group} align="center" spacing={4} mb="1" flex="1">
              {options.map((option) => {
                const radio = getRadioProps({ value: option.value });
                return (
                  <ChannelRadio
                    key={option.name}
                    {...radio}
                    customColor={CATEGORY_COLOR_SCHEMES[option.name]}
                  >
                    {option.name}
                  </ChannelRadio>
                );
              })}
            </HStack>
          </ScrollContainer>
        </Box>
      </Grid>
    </>
  );
};

export default ChannelSelector;
