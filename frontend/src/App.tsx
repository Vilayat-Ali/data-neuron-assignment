import {
  Box,
  Flex
} from '@chakra-ui/react';

import Stats from './component/components/Stats';
import Form from './component/components/Form';
import TodoTable from './component/components/TodoTable';

import Resizable from './component/ResizableComponent';

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
          <Box width={{
              base: '90%',
              md: '48%'
            }} 
            marginY={{
                base: '5vw',
                md: '2vw'
            }}>
              <Resizable>
                <Stats />
              </Resizable>
          </Box>

          <Box width={{
                base: '90%',
                md: '48%'
              }} 
              marginY={{
                  base: '5vw',
                  md: '2vw'
              }}>
            <Resizable>
              <Form />
            </Resizable>
          </Box>
      </Flex>

      <Box width={{
            base: '90%',
            md: '95%'
          }} 
          marginY={{
              base: '5vw',
              md: '2vw'
          }}>
          <Resizable>
            <TodoTable />
          </Resizable>
      </Box>
    </Box>
  )
}

export default App
