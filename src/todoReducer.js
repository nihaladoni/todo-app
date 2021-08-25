const TodoReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_TODO':
      return payload;
    case 'ADD_TODO':
      if (state === null) {
        window.localStorage.setItem('todos', JSON.stringify([payload]));
      } else {
        const otherState = state && state.filter(d => d);
        JSON.stringify(
          window.localStorage.setItem(
            'todos',
            JSON.stringify([...otherState, payload])
          )
        );
      }
      return JSON.parse(window.localStorage.getItem('todos'));
    case 'EDIT_TODO':
      const a = state.filter(d => {
        if (d.id === payload.id) {
          d.completed = !d.completed;
          return d;
        } else {
          return d;
        }
      });
      window.localStorage.setItem('todos', JSON.stringify([...a]));

      return a;

    case 'DELETE_TODO':
      const filteredTodo = state.filter(d => d.id !== payload.id);
      window.localStorage.setItem('todos', JSON.stringify([...filteredTodo]));
      return filteredTodo;
    case 'DELETEALL_TODO':
      window.localStorage.clear();
      return [];

    default:
      return state;
  }
};

export default TodoReducer;
