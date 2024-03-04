import React from 'react';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Card, CardBody, ButtonGroup, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import useToggle from '../../hooks/useToggle';
import * as Yup from 'yup';
import { useCreateTodoMutation, useUpdateTodoMutation } from '../../app/api/todo.api';
import { useAppSelector } from '../../app/hooks';

interface TodoFormValues {
  title: string;
  description?: string;
}

const TodoForm: React.FC = () => {
  const toast = useToast();
  const selectedTodo = useAppSelector((state) => state.todo.selectedTodo);
  const [isCreateFormOpen, toggleForm] = useToggle(true);
  const initialValues: TodoFormValues = { title: '', description: '' };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
  });

  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleMarkAsComplete = async () => {
    try {
      await updateTodo({
        id: selectedTodo,
        updatedFields: {
          isCompleted: true
        }
      });
      toast({
              description: "Selected Todo is marked as completed!",
              status: 'info',
              isClosable: true
            })
    } catch(err: any) {
      toast({
              description: err?.message || "Error",
              status: 'error',
              isClosable: true
            })
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if(isCreateFormOpen) {
          await createTodo(values);
        } else {
          if(selectedTodo === "") {
            toast({
              description: 'No Todo is selected',
              status: 'error',
              isClosable: true
            })
          }
          await updateTodo({
            id: selectedTodo,
            updatedFields: values
          });
        }
      resetForm();
      } catch(err: any) {
        console.error(err)
      }
    },
  });

  return (
    <Card width={{
      base: '95%',
      md: '48%'
    }}>
      <CardBody>
        <Box as="form" onSubmit={formik.handleSubmit}>
          <FormControl id="title" isInvalid={!!formik.errors.title && formik.touched.title}>
            <FormLabel>{isCreateFormOpen ? 'Create' : 'Update'} a TODO</FormLabel>
            <Input
              type="text"
              placeholder="Enter title"
              {...formik.getFieldProps('title')}
            />
            <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
          </FormControl>
          <FormControl id="description" mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              placeholder="Enter description"
              {...formik.getFieldProps('description')}
            />
          </FormControl>
          <ButtonGroup gap={1}>
          <Button mt={4} colorScheme="teal" type="submit" isLoading={formik.isSubmitting}>
            {isCreateFormOpen ? "Add Todo" : "Update Todo"}
          </Button>
            {
              !isCreateFormOpen ? (
                <Button mt={4} colorScheme="teal" onClick={() => handleMarkAsComplete()}>
                  Mark as Done
                </Button>
              ) : (
                <Button mt={4} colorScheme="teal" onClick={toggleForm}>
                  Update
                </Button>
              )
            }
          </ButtonGroup>
        </Box>
      </CardBody>
    </Card>
  );
};

export default TodoForm;
