import { Badge, Box, Card, CardBody, Flex, Text } from '@chakra-ui/react';
import { useGetCountQuery } from '../../app/api/todo.api';

const Stats = () => {
  const { data, isLoading, isError } = useGetCountQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card width='100%' height='100%' >
      <CardBody>
        {
          !isError && data ? (
          <Box borderRadius="lg" overflow="hidden">
          <Box p="4" fontSize={{ base: '4vw', md: '2vw' }}>
            <Flex alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                Total Add Operations
              </Badge>
              <Text ml="2" color="gray.600" fontSize="sm">
                {data?.data?.ADD}
              </Text>
            </Flex>

            <Flex alignItems="baseline" mt="2">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                Total Update Operations
              </Badge>
              <Text ml="2" color="gray.600" fontSize="sm">
                {data?.data?.UPDATE}
              </Text>
            </Flex>

            <Flex alignItems="baseline" mt="2">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                Total Delete Operations
              </Badge>
              <Text ml="2" color="gray.600" fontSize="sm">
                {data?.data?.DELETE}
              </Text>
            </Flex>
          </Box>
        </Box>
          ) : (
            <div>Error fetching data</div>
          )
        }
        
      </CardBody>
    </Card>
  );
};

export default Stats;
