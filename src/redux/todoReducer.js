const TodoReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_TODO':
      return payload || [];
    case 'ADD_TODO':
      const currentState = state || [];
      const cleanState = currentState.filter(d => d);
      const newTodos = [...cleanState, payload];
      window.localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    case 'EDIT_TODO':
      const updatedState = (state || []).map(d =>
        d.id === payload.id ? { ...d, ...payload } : d
      );
      window.localStorage.setItem('todos', JSON.stringify(updatedState));
      return updatedState;
    case 'DELETE_TODO':
      const filteredTodo = (state || []).filter(d => d.id !== payload.id);
      window.localStorage.setItem('todos', JSON.stringify(filteredTodo));
      return filteredTodo;
    case 'DELETEALL_TODO':
      window.localStorage.setItem('todos', JSON.stringify([]));
      return [];
    default:
      return state;
  }
};

export default TodoReducer;
