import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Checkbox,
  Flex,
  HStack,
  VStack,
  Box,
  IconButton,
  Badge,
  Text,
  Input,
  Select,
  useColorModeValue,
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { editTodo, deleteTodo, deleteAllTodo } from '../redux/actions';

const TodoList = ({ data = [], addDeleteIcon = false }) => {
  const dispatch = useDispatch();

  // Local state for tracking editing
  const [editingId, setEditingId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const [editCategory, setEditCategory] = useState('Personal');
  const [editDueDate, setEditDueDate] = useState('');

  const [todoToDelete, setTodoToDelete] = useState(null);
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
  const cancelRef = useRef();

  const bgCard = useColorModeValue('white', '#1E293B');
  const borderCardColor = useColorModeValue('gray.200', '#334155');
  const textMuted = useColorModeValue('gray.400', 'gray.400');

  const startEditing = (todoItem) => {
    setEditingId(todoItem.id);
    setEditTodoText(todoItem.todo);
    setEditPriority(todoItem.priority || 'medium');
    setEditCategory(todoItem.category || 'Personal');
    setEditDueDate(todoItem.dueDate || '');
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditing = (id) => {
    if (editTodoText.trim() === '') return;
    dispatch(
      editTodo({
        id,
        todo: editTodoText.trim(),
        priority: editPriority,
        category: editCategory,
        dueDate: editDueDate || null,
      })
    );
    setEditingId(null);
  };

  const handleCheckboxChange = (e, todoItem) => {
    dispatch(
      editTodo({
        ...todoItem,
        completed: e.target.checked,
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllTodo());
  };

  // Helper to format date nicely (e.g., Jun 15, 2026)
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Helper to determine if a date is overdue
  const isOverdue = (dateStr, completed) => {
    if (!dateStr || completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDateObj = new Date(dateStr);
    dueDateObj.setHours(0, 0, 0, 0);
    return dueDateObj < today;
  };

  const categories = ['Personal', 'Work', 'Shopping', 'Health', 'Learning'];

  return (
    <VStack align="stretch" spacing={3} mt={4} w="100%">
      <AnimatePresence initial={false}>
        {data && data.length > 0 ? (
          data.map((d) => {
            const isEditing = editingId === d.id;
            const overdue = isOverdue(d.dueDate, d.completed);
            const priorityColor =
              d.completed
                ? 'green.500'
                : d.priority === 'high'
                ? 'priority.high'
                : d.priority === 'low'
                ? 'priority.low'
                : 'priority.medium';

            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <Box
                  bg={bgCard}
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor={borderCardColor}
                  borderLeft="5px solid"
                  borderLeftColor={priorityColor}
                  p={4}
                  boxShadow="sm"
                  transition="all 0.2s"
                  _hover={{ boxShadow: 'md', transform: 'translateY(-1px)' }}
                >
                  {isEditing ? (
                    <VStack align="stretch" spacing={3}>
                      <Input
                        value={editTodoText}
                        onChange={(e) => setEditTodoText(e.target.value)}
                        placeholder="Task details"
                        size="sm"
                      />
                      <HStack spacing={3} wrap="wrap">
                        {/* Priority Selector */}
                        <VStack align="start" spacing={1} flex="1" minW="100px">
                          <Text fontSize="9px" fontWeight="bold" color="gray.500" textTransform="uppercase">
                            Priority
                          </Text>
                          <Select
                            size="xs"
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value)}
                            borderRadius="lg"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </Select>
                        </VStack>

                        {/* Category Selector */}
                        <VStack align="start" spacing={1} flex="1" minW="100px">
                          <Text fontSize="9px" fontWeight="bold" color="gray.500" textTransform="uppercase">
                            Category
                          </Text>
                          <Select
                            size="xs"
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            borderRadius="lg"
                          >
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                            {!categories.includes(editCategory) && (
                              <option value={editCategory}>{editCategory}</option>
                            )}
                          </Select>
                        </VStack>

                        {/* Due Date Selector */}
                        <VStack align="start" spacing={1} flex="1" minW="100px">
                          <Text fontSize="9px" fontWeight="bold" color="gray.500" textTransform="uppercase">
                            Due Date
                          </Text>
                          <Input
                            size="xs"
                            type="date"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            borderRadius="lg"
                          />
                        </VStack>
                      </HStack>

                      <HStack justify="flex-end" spacing={3} mt={1}>
                        <Tooltip label="Cancel" hasArrow>
                          <IconButton
                            aria-label="Cancel editing"
                            icon={<FaTimes />}
                            size="xs"
                            colorScheme="gray"
                            onClick={cancelEditing}
                            borderRadius="lg"
                          />
                        </Tooltip>
                        <Tooltip label="Save changes" hasArrow>
                          <IconButton
                            aria-label="Save changes"
                            icon={<FaCheck />}
                            size="xs"
                            colorScheme="brand"
                            onClick={() => saveEditing(d.id)}
                            borderRadius="lg"
                          />
                        </Tooltip>
                      </HStack>
                    </VStack>
                  ) : (
                    <Flex justify="space-between" align="center">
                      <HStack spacing={3} flex="1" minW="0">
                        <Checkbox
                          size="lg"
                          isChecked={d.completed}
                          onChange={(e) => handleCheckboxChange(e, d)}
                        />
                        <VStack align="start" spacing={1} flex="1" minW="0">
                          <Text
                            fontWeight="500"
                            fontSize="md"
                            color={d.completed ? textMuted : 'inherit'}
                            textDecoration={d.completed ? 'line-through' : 'none'}
                            isTruncated
                            wordBreak="break-word"
                            whiteSpace="normal"
                          >
                            {d.todo}
                          </Text>
                          <HStack spacing={2} flexWrap="wrap" sx={{ rowGap: 1 }}>
                            {/* Category Badge */}
                            {d.category && (
                              <Badge
                                variant="subtle"
                                colorScheme="purple"
                                borderRadius="md"
                                textTransform="capitalize"
                                px={2}
                                py={0.5}
                                fontSize="9px"
                              >
                                {d.category}
                              </Badge>
                            )}

                            {/* Due Date Badge */}
                            {d.dueDate && (
                              <HStack
                                spacing={1}
                                color={overdue ? 'red.500' : 'gray.500'}
                                fontSize="9px"
                                fontWeight={overdue ? 'bold' : 'normal'}
                              >
                                <FaCalendarAlt size={9} />
                                <Text>{formatDate(d.dueDate)}</Text>
                                {overdue && <Text fontSize="8px">(Overdue)</Text>}
                              </HStack>
                            )}
                          </HStack>
                        </VStack>
                      </HStack>

                      {/* Edit/Delete Actions */}
                      <HStack spacing={1} ml={2}>
                        {!d.completed && (
                          <Tooltip label="Edit task" hasArrow>
                            <IconButton
                              aria-label="Edit todo"
                              icon={<FaEdit />}
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditing(d)}
                              borderRadius="lg"
                            />
                          </Tooltip>
                        )}
                        {(addDeleteIcon || d.completed) && (
                          <Tooltip label="Delete task" hasArrow>
                            <IconButton
                              aria-label="Delete todo"
                              icon={<FaTrash />}
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => setTodoToDelete(d)}
                              borderRadius="lg"
                            />
                          </Tooltip>
                        )}
                      </HStack>
                    </Flex>
                  )}
                </Box>
              </motion.div>
            );
          })
        ) : (
          <Flex direction="column" align="center" justify="center" py={8} opacity={0.6}>
            <Text fontSize="md" color="gray.500" textAlign="center">
              No tasks found.
            </Text>
          </Flex>
        )}
      </AnimatePresence>

      {/* Bulk Delete option in completed view */}
      {addDeleteIcon && data.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Flex justify="flex-end" mt={4}>
            <Button
              size="md"
              leftIcon={<FaTrash />}
              onClick={() => setIsDeleteAllOpen(true)}
              colorScheme="red"
              variant="solid"
              borderRadius="xl"
              boxShadow="sm"
            >
              Delete All
            </Button>
          </Flex>
        </motion.div>
      )}

      {/* Confirmation Dialog for Single Todo Delete */}
      <AlertDialog
        isOpen={todoToDelete !== null}
        leastDestructiveRef={cancelRef}
        onClose={() => setTodoToDelete(null)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="2xl" mx={4}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete the task <Text as="span" fontWeight="bold">"{todoToDelete?.todo}"</Text>? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setTodoToDelete(null)} borderRadius="xl">
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete(todoToDelete.id);
                  setTodoToDelete(null);
                }}
                ml={3}
                borderRadius="xl"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Confirmation Dialog for Delete All */}
      <AlertDialog
        isOpen={isDeleteAllOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteAllOpen(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="2xl" mx={4}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete All Completed Tasks
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete all completed tasks? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteAllOpen(false)} borderRadius="xl">
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteAll();
                  setIsDeleteAllOpen(false);
                }}
                ml={3}
                borderRadius="xl"
              >
                Delete All
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};

export default TodoList;
