import {
  Button,
  HStack,
  Input,
  VStack,
  Select,
  Box,
  Text,
  ButtonGroup,
  useColorModeValue,
  Collapse,
  IconButton,
  Tooltip
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaSlidersH } from 'react-icons/fa';
import uniqid from 'uniqid';

import { addTodo } from '../redux/actions';

const MyInput = () => {
  const [todo, setTodo] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Personal');
  const [customCategory, setCustomCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const dispatch = useDispatch();

  const handleFormSubmit = e => {
    e.preventDefault();
    if (todo.trim() === '') {
      return;
    }

    const postObj = {
      id: uniqid(),
      todo: todo.trim(),
      completed: false,
      priority,
      category: category === 'Custom' && customCategory.trim() ? customCategory.trim() : category,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
    };

    dispatch(addTodo(postObj));
    setTodo('');
    setDueDate('');
    setPriority('medium');
    setCategory('Personal');
    setCustomCategory('');
  };

  const bgCard = useColorModeValue('white', '#1E293B');
  const borderCardColor = useColorModeValue('gray.200', '#334155');

  const categories = ['Personal', 'Work', 'Shopping', 'Health', 'Learning', 'Custom'];

  return (
    <Box
      w="100%"
      p={4}
      bg={bgCard}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={borderCardColor}
      boxShadow="sm"
      mb={6}
    >
      <form onSubmit={handleFormSubmit}>
        <VStack spacing={4} align="stretch">
          <HStack w="100%">
            <Input
              size="lg"
              placeholder="What needs to be done?"
              onChange={e => setTodo(e.target.value)}
              value={todo}
              variant="outline"
              fontSize="md"
            />
            <Tooltip label="Task details and settings" hasArrow>
              <IconButton
                icon={<FaSlidersH />}
                onClick={() => setShowOptions(!showOptions)}
                variant={showOptions ? "solid" : "ghost"}
                colorScheme={showOptions ? "brand" : "gray"}
                aria-label="Toggle advanced options"
                size="lg"
                borderRadius="xl"
              />
            </Tooltip>
            <Button
              size="lg"
              bg="brand.500"
              color="white"
              type="submit"
              px="8"
              _hover={{ bg: 'brand.600', transform: 'scale(1.02)' }}
              _active={{ transform: 'scale(0.98)' }}
            >
              Add
            </Button>
          </HStack>

          <Collapse in={showOptions} animateOpacity>
            <VStack spacing={4} align="stretch" pt={4} borderTopWidth="1px" borderColor={borderCardColor}>
              {/* Priority Selection */}
              <VStack align="start" spacing={1.5}>
                <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                  Priority
                </Text>
                <ButtonGroup size="sm" isAttached variant="outline" w="100%">
                  <Button
                    flex="1"
                    onClick={() => setPriority('low')}
                    colorScheme={priority === 'low' ? 'green' : 'gray'}
                    variant={priority === 'low' ? 'solid' : 'outline'}
                    borderTopLeftRadius="xl"
                    borderBottomLeftRadius="xl"
                  >
                    Low
                  </Button>
                  <Button
                    flex="1"
                    onClick={() => setPriority('medium')}
                    colorScheme={priority === 'medium' ? 'yellow' : 'gray'}
                    variant={priority === 'medium' ? 'solid' : 'outline'}
                  >
                    Medium
                  </Button>
                  <Button
                    flex="1"
                    onClick={() => setPriority('high')}
                    colorScheme={priority === 'high' ? 'red' : 'gray'}
                    variant={priority === 'high' ? 'solid' : 'outline'}
                    borderTopRightRadius="xl"
                    borderBottomRightRadius="xl"
                  >
                    High
                  </Button>
                </ButtonGroup>
              </VStack>

              {/* Category and Due Date Rows */}
              <HStack spacing={4} w="100%" align="end">
                {/* Category Selection */}
                <VStack align="start" spacing={1.5} flex="1">
                  <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                    Category
                  </Text>
                  <Select
                    size="sm"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    borderRadius="xl"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </VStack>

                {/* Due Date */}
                <VStack align="start" spacing={1.5} flex="1">
                  <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                    Due Date
                  </Text>
                  <Input
                    size="sm"
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    borderRadius="xl"
                    css={{
                      colorScheme: useColorModeValue('light', 'dark')
                    }}
                  />
                </VStack>
              </HStack>

              {category === 'Custom' && (
                <Collapse in={category === 'Custom'} animateOpacity>
                  <VStack align="start" spacing={1.5} w="100%">
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                      Custom Category Name
                    </Text>
                    <Input
                      size="sm"
                      placeholder="Enter custom category"
                      value={customCategory}
                      onChange={e => setCustomCategory(e.target.value)}
                      borderRadius="xl"
                    />
                  </VStack>
                </Collapse>
              )}
            </VStack>
          </Collapse>
        </VStack>
      </form>
    </Box>
  );
};

export default MyInput;
