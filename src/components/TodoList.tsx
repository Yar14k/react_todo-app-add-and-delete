import { useState } from 'react';
import TodoItem from './TodoItem';
import { getTodos } from '../api/todos';
import { useEffect } from 'react';
import CreateTodo from './CreateTodo';
import { createTodo } from '../api/todos';
import { USER_ID } from '../api/todos';
import { ErrorMessagesNotification } from '../api/todos';
import { ErrorMessagesProps } from '../components/ErrorMessages';
import Footer from './Footer';
import { Filter } from './Footer';

export interface Todo {
  id: string | number;
  title: string;
  completed: boolean;
  userId: number;
  loading?: boolean;
}

const TodoList: React.FC<ErrorMessagesProps> = ({ setError }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const handleAddTodo = async (title: string) => {
    const tempTodo: Todo = {
      id: 'temp-' + Date.now(),
      title,
      completed: false,
      userId: USER_ID,
      loading: true,
    };

    setTodos(prev => [...prev, tempTodo]);

    try {
      const savedTodo = await createTodo({
        title,
        userId: USER_ID,
        completed: false,
      });

      setTodos(prev => {
        return prev.map(todo => (todo.id === tempTodo.id ? savedTodo : todo));
      });
    } catch {
      setTodos(prev => prev.filter(todo => todo.id !== tempTodo.id));
      setError(ErrorMessagesNotification.ADD);
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
        setError(null);
      } catch (err) {
        setError(ErrorMessagesNotification.LOAD);
      }
    };

    loadTodos();
  }, [setError]);

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const visibleTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <>
      <CreateTodo
        onAdd={handleAddTodo}
        allCompleted={allCompleted}
        setError={setError}
      />
      <section className="todoapp__main" data-cy="TodoList">
        {visibleTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </section>
      <Footer todos={todos} filter={filter} setFilter={setFilter} />
    </>
  );
};

export default TodoList;
