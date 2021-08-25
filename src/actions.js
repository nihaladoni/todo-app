export const getTodo = () => ({
  type: 'GET_TODO',
  payload: JSON.parse(window.localStorage.getItem('todos')),
});

export const addTodo = todo => ({
  type: 'ADD_TODO',
  payload: todo,
});

export const editTodo = obj => ({ type: 'EDIT_TODO', payload: obj });
export const deleteTodo = id => ({ type: 'DELETE_TODO', payload: { id } });
export const deleteAllTodo = id => ({ type: 'DELETEALL_TODO' });
