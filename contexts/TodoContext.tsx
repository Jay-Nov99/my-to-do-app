
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TodoItem, TodoFilter } from '@/types/todo';

interface TodoContextType {
  todos: TodoItem[];
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
  addTodo: (title: string, description?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  getFilteredTodos: () => TodoItem[];
  getStats: () => { total: number; completed: number; active: number };
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');

  // Add a new todo
  const addTodo = (title: string, description?: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
    console.log('Added new todo:', newTodo);
  };

  // Toggle todo completion
  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date() : undefined,
            }
          : todo
      )
    );
    console.log('Toggled todo:', id);
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    console.log('Deleted todo:', id);
  };

  // Get filtered todos
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  // Get stats
  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  };

  // Initialize with some sample data
  useEffect(() => {
    const sampleTodos: TodoItem[] = [
      {
        id: '1',
        title: 'Welcome to your To-Do App!',
        description: 'This is your first task. Tap the checkbox to mark it as complete.',
        completed: false,
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Add a new task',
        description: 'Tap the + button to add your own tasks.',
        completed: false,
        createdAt: new Date(),
      },
    ];
    
    setTodos(sampleTodos);
  }, []);

  const value: TodoContextType = {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    getFilteredTodos,
    getStats,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
