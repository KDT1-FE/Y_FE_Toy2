import {
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';

export const skeletons = Array.from({ length: 4 });

const LoadingSkeleton = () => {
  return (
    <Card w={220}>
      <CardHeader>
        <Skeleton height="32px" mb="2" />
        <Skeleton height="16px" />
      </CardHeader>
      <CardBody display="flex" justifyContent="flex-end">
        <SkeletonCircle size="10" mr="1" />
        <SkeletonCircle size="10" />
      </CardBody>
    </Card>
  );
};

export default LoadingSkeleton;
