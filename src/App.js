import React, { useEffect, useState, useMemo } from 'react';
import {
  Center,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodo } from './redux/actions';

import Header from './components/Header';
import ProgressCard from './components/ProgressCard';
import FilterPanel from './components/FilterPanel';
import MyInput from './components/MyInput';
import TodoList from './components/TodoList';

// Pure helper function to filter and sort todos outside the render scope
const filterAndSort = (todosList, searchQuery, priorityFilter, categoryFilter, sortBy) => {
  return todosList
    .filter(item => {
      const matchesSearch = item.todo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      return matchesSearch && matchesPriority && matchesCategory;
    })
    .sort((a, b) => {
      // Completed items always move to the bottom
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;

      // Secondary sort based on selected criteria
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'priority') {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        const weightA = priorityWeight[a.priority || 'medium'] || 2;
        const weightB = priorityWeight[b.priority || 'medium'] || 2;
        return weightB - weightA;
      }
      return 0;
    });
};

function App() {
  const rawTodo = useSelector(state => state.todos);
  const todo = useMemo(() => rawTodo || [], [rawTodo]);
  const dispatch = useDispatch();

  // Filter & Search & Sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showSettings, setShowSettings] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  // Compute active/completed subsets from all todos (Optimized with useMemo)
  const activeTodo = useMemo(() => todo.filter(d => !d.completed), [todo]);
  const completedTodo = useMemo(() => todo.filter(d => d.completed), [todo]);

  // Stats for the progress bar (Optimized with useMemo)
  const totalTasks = todo.length;
  const completedCount = completedTodo.length;
  const completionPercent = useMemo(() => {
    return totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  }, [totalTasks, completedCount]);

  // Dynamic unique categories for filter select options (Optimized with useMemo)
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(todo.map(item => item.category).filter(Boolean)));
  }, [todo]);

  // Memoized filter and sort lists to prevent redundant recalculations on keystroke/toggle
  const sortedAndFilteredAll = useMemo(() => {
    return filterAndSort(todo, searchQuery, priorityFilter, categoryFilter, sortBy);
  }, [todo, searchQuery, priorityFilter, categoryFilter, sortBy]);

  const sortedAndFilteredActive = useMemo(() => {
    return filterAndSort(activeTodo, searchQuery, priorityFilter, categoryFilter, sortBy);
  }, [activeTodo, searchQuery, priorityFilter, categoryFilter, sortBy]);

  const sortedAndFilteredCompleted = useMemo(() => {
    return filterAndSort(completedTodo, searchQuery, priorityFilter, categoryFilter, sortBy);
  }, [completedTodo, searchQuery, priorityFilter, categoryFilter, sortBy]);

  // Modern dynamic slogans for progress card
  const slogan = useMemo(() => {
    if (totalTasks === 0) return "Add your first task to get started!";
    if (completionPercent === 100) return "Outstanding! You've crushed all your tasks! 🎉";
    if (completionPercent >= 75) return "Almost there! Finish line is in sight! 🚀";
    if (completionPercent >= 50) return "Halfway through! Keep up the momentum! 💪";
    if (completionPercent >= 25) return "Great start! One step at a time. ✨";
    return "Let's make some progress today! 🌟";
  }, [totalTasks, completionPercent]);

  const borderCardColor = useColorModeValue('gray.200', '#334155');
  const bgControl = useColorModeValue('white', '#1E293B');

  return (
    <Center py={8}>
      <VStack w={['92%', '85%', '600px']} spacing={5} align="stretch">
        {/* Header Bar */}
        <Header
          showProgress={showProgress}
          setShowProgress={setShowProgress}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />

        {/* Progress Card Dashboard */}
        <ProgressCard
          showProgress={showProgress}
          totalTasks={totalTasks}
          completedCount={completedCount}
          completionPercent={completionPercent}
          slogan={slogan}
        />

        {/* Filters & Sorting Panel */}
        <FilterPanel
          showSettings={showSettings}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          uniqueCategories={uniqueCategories}
          bgControl={bgControl}
          borderCardColor={borderCardColor}
        />

        {/* Task Manager Tabs */}
        <Tabs w="100%" colorScheme="brand">
          <TabList mb={2}>
            <Tab fontWeight="bold" flex="1">All</Tab>
            <Tab fontWeight="bold" flex="1">Active</Tab>
            <Tab fontWeight="bold" flex="1">Completed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px="0" pt={3}>
              <MyInput />
              <TodoList data={sortedAndFilteredAll} />
            </TabPanel>
            <TabPanel px="0" pt={3}>
              <MyInput />
              <TodoList data={sortedAndFilteredActive} />
            </TabPanel>
            <TabPanel px="0" pt={3}>
              <TodoList data={sortedAndFilteredCompleted} addDeleteIcon />
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Privacy Disclaimer Footer */}
        <Text
          fontSize="10px"
          color={useColorModeValue('gray.400', 'gray.500')}
          textAlign="center"
          mt={4}
          opacity={0.8}
        >
          🔒 All your data is saved locally in your browser. No data is sent to the cloud.
        </Text>
      </VStack>
    </Center>
  );
}

export default App;
