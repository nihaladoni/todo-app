import React, { useEffect } from 'react';
import {
  ChakraProvider,
  Heading,
  Center,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  VStack,
} from '@chakra-ui/react';
import { theme } from './theme';

import MyInput from './components/MyInput';

import TodoList from './components/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { getTodo } from './actions';

function App() {
  const todo = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const activeTodo = todo && todo.filter(d => d.completed === false);
  const completedTodo = todo && todo.filter(d => d.completed === true);

  useEffect(() => {
    dispatch(getTodo());
  }, []);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Center>
        <VStack w={['80%', '80%', '40%']}>
          <Heading my={5} css={{ fontFamily: 'raleway', fontWeight: 700 }}>
            #todo
          </Heading>
          <Tabs w="100%" css={{ fontFamily: 'montserrat', fontWeight: 500 }}>
            <TabList css={{ justifyContent: 'space-between' }}>
              <Tab>All</Tab>
              <Tab>Active</Tab>
              <Tab>Completed</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px="0">
                <MyInput />
                <TodoList />
                <TodoList data={todo} />
              </TabPanel>
              <TabPanel px="0">
                <MyInput />
                <TodoList />
                <TodoList data={activeTodo} />
              </TabPanel>
              <TabPanel px="0">
                <TodoList data={completedTodo} addDeleteIcon />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default App;
