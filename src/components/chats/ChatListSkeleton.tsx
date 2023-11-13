import { Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const ChatListSkeleton = () => {
  return (
    <Flex mb="8">
      <SkeletonCircle
        w="14"
        size="50"
        borderRadius="full"
        mr="2.5"
        startColor="gray.100"
        endColor="gray.200"
      />
      <Flex flexDir="column" w="full" gap={2}>
        <Flex w="full" gap={2} alignItems="flex-end">
          <Skeleton
            height="4"
            w="14"
            startColor="gray.100"
            endColor="gray.200"
          />
          <Skeleton
            height="2"
            w="14"
            startColor="gray.100"
            endColor="gray.200"
          />
        </Flex>
        <SkeletonText
          w="full"
          noOfLines={2}
          spacing="2"
          skeletonHeight="2"
          startColor="gray.100"
          endColor="gray.200"
        />
      </Flex>
    </Flex>
  );
};

export default ChatListSkeleton;
