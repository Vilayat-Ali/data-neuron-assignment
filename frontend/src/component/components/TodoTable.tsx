import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Center,
  CardBody,
  Card,
  useToast,
  Text,
} from '@chakra-ui/react';
import { Todo } from '../../interfaces/todo';
import { useGetAllTodosQuery } from '../../app/api/todo.api';
import { useAppDispatch } from '../../app/hooks';
import { set } from '../../app/slice/todo.slice';

const TodoTable: React.FC = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  // we can expand the filter functionality by adding pageLimit Dispatch action but we are omitting it because it is out
  // of the scope of this assessment project
  const [pageLimit, _] = useState<number>(5);

  // data refetch logic
  const {data, isSuccess, refetch} = useGetAllTodosQuery({
    page: currentPage,
    limit: pageLimit
  });

  // it is an expensive computation so why not memoise it? It will only update once the value is actually change here,
  // it will not change until and unless count of todos change
  const maxPageCount = useMemo(() => Math.ceil(data?.todos[0].totalCount / pageLimit), [pageLimit, data]);

  const handleNextPage = () => {
    if (currentPage === maxPageCount) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleTodoSelection = (id: string) => {
    dispatch(
      set(id)
    );
    toast({
      description: 'Todo selected successfully!',
      status: 'success',
      isClosable: true
    })
  }

  useEffect(() => {
    refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageLimit]);

  return (
    <Card width={{
      base: '90%',
      md: '100%'
    }} marginY={{
        base: '5vw',
        md: '2vw'
    }} >
      <CardBody>
    <Box>
      {isSuccess && data && data?.todos && data?.todos.length > 0 && data?.todos[0].todos.length > 0 ? (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Is Completed?</Th>
                <Th>Created At</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.todos[0].todos.map((todo: Todo) => (
                <Tr key={todo._id} cursor='pointer' _hover={{background: 'black', color: 'white'}} onClick={() => handleTodoSelection(todo._id)}>
                  <Td>{todo.title}</Td>
                  <Td>{todo.description}</Td>
                  <Td>{todo.isCompleted ? 'YES' : 'NO'}</Td>
                  <Td>{Date(todo.createdAt)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Center mt={4}>
            <Button mr={2} onClick={handlePrevPage}>Previous</Button>
            <Text mx="6px">{currentPage} in {maxPageCount}</Text>
            <Button onClick={handleNextPage}>Next</Button>
          </Center>
        </>
       ) : (
        <Center>
          <Text>No todos available.</Text>
        </Center>
      )} 
    </Box>
    </CardBody>
    </Card>
  );
};

export default TodoTable;
