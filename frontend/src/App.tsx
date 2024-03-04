import {
  Box,
  Flex
} from '@chakra-ui/react';

import Profile from './component/components/Profile';
import Form from './component/components/Form';
import TodoTable from './component/components/TodoTable';

const App = () => {
  return (
    <Box width="100vw" height="100vh" overflow='hidden' paddingX={{
      base: '4%',
      md: '5%'
    }} paddingY={{
      base: '2%',
      md: '3%'
    }} bgColor="gray">
      <Flex 
        direction={{
          base: 'column',
          md: 'row'
        }} 
        justifyContent={{
          base: 'space-around',
          md: 'space-between'
        }} 
        alignItems={{
          base: 'center',
          md: 'baseline'
        }}>
          <Profile />

          <Form />
      </Flex>
      <TodoTable />
    </Box>
  )
}

export default App
