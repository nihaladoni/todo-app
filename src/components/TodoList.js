import { Button, Checkbox, Flex, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAllTodo, deleteTodo, editTodo } from '../actions';

const TodoList = ({ data, addDeleteIcon = false }) => {
  const dispatch = useDispatch();

  const handleDeleteIcon = id => {
    dispatch(deleteTodo(id));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllTodo());
  };

  const handleChange = (e, d) => {
    const obj = {
      ...d,
      completed: e.target.checked,
    };

    dispatch(editTodo(obj));
  };

  return (
    <VStack marginY={addDeleteIcon ? '0' : '7'} alignItems="stretch">
      {data &&
        data.map(d => (
          <React.Fragment key={d.id}>
            <HStack>
              <Checkbox
                size="lg"
                key={d.id}
                w="100%"
                isChecked={d.completed ? true : false}
                onChange={e => handleChange(e, d)}
              >
                {d.completed ? <s>{d.todo}</s> : d.todo}
              </Checkbox>
              {addDeleteIcon ? (
                <span
                  className="material-icons material-icons-outlined"
                  style={{ color: '#BDBDBD', cursor: 'pointer' }}
                  onClick={() => handleDeleteIcon(d.id)}
                >
                  delete
                </span>
              ) : null}
            </HStack>
          </React.Fragment>
        ))}

      {addDeleteIcon ? (
        <Flex justify="flex-end" style={{ marginTop: '25px' }}>
          <Button
            size="md"
            onClick={handleDeleteAll}
            bg="#EB5757"
            color="#fff"
            _hover={{ bg: '#EB5757', opacity: 0.7 }}
          >
            <span className="material-icons material-icons-outlined">
              delete
            </span>
            delete all
          </Button>
        </Flex>
      ) : null}
    </VStack>
  );
};

export default TodoList;
