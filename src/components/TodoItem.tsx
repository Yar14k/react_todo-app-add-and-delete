/* eslint-disable jsx-a11y/label-has-associated-control */
import { deleteTodo } from '../api/todos';
import classNames from 'classnames';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  loading?: boolean;
};

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem = ({ todo, setTodos }: Props) => {
  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);

      setTodos(current =>
        current.filter(deletedTodo => {
          return deletedTodo.id !== todo.id;
        }),
      );
    } catch (error) {
      alert('Failed to delete todo');
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      // eslint-disable-next-line react/jsx-no-comment-textnodes
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDelete}
      >
        ×
      </button>
      <div
        data-cy="TodoLoader"
        className={`modal overlay ${todo.loading ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

export default TodoItem;
