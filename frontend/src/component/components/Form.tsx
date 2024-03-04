import React from 'react';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Card, CardBody } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateTodoMutation } from '../../app/api/todo.api';

interface TodoFormValues {
  title: string;
  description?: string;
}

const TodoForm: React.FC = () => {
  const initialValues: TodoFormValues = { title: '', description: '' };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
  });

  const [createTodo] = useCreateTodoMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await createTodo(values);
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
            <FormLabel>Create a TODO</FormLabel>
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
          <Button mt={4} colorScheme="teal" type="submit" isLoading={formik.isSubmitting}>
            Add Todo
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
};

export default TodoForm;
