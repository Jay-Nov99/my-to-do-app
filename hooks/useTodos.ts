
import { useTodoContext } from '@/contexts/TodoContext';

export const useTodos = () => {
  const context = useTodoContext();
  
  return {
    todos: context.getFilteredTodos(),
    allTodos: context.todos,
    filter: context.filter,
    setFilter: context.setFilter,
    addTodo: context.addTodo,
    toggleTodo: context.toggleTodo,
    deleteTodo: context.deleteTodo,
    stats: context.getStats(),
  };
};
