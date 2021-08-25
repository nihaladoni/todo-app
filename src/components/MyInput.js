import { Button, HStack, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import uniqid from 'uniqid';

import { addTodo } from '../actions';

const MyInput = () => {
  const [data, setData] = useState('');
  const dispatch = useDispatch();

  const handleFormSubmit = e => {
    e.preventDefault();
    if (data === '') {
      return null;
    }

    const postObj = {
      id: uniqid(),
      todo: data,
      completed: false,
    };

    dispatch(addTodo(postObj));
    setData('');
  };

  return (
    <form method="POST" onSubmit={handleFormSubmit}>
      <HStack w="100%">
        <Input
          placeholder="add details"
          onChange={e => setData(e.target.value)}
          value={data}
        />
        <Button bg="blue.500" color="white" type="submit" px="8" py="4">
          Add
        </Button>
      </HStack>
    </form>
  );
};

export default MyInput;
