import classNames from 'classnames';
import { ErrorMessagesNotification } from '../api/todos';
import { useEffect, useRef, useState } from 'react';

type Props = {
  onAdd: (title: string) => Promise<void>;
  allCompleted: boolean;
  setError: (error: ErrorMessagesNotification | null) => void;
};

const CreateTodo: React.FC<Props> = ({ onAdd, allCompleted, setError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const todo = new FormData(form).get('todo') as string;

    if (!todo.trim()) {
      setError(ErrorMessagesNotification.EMPTY_TITLE);

      return;
    }

    setIsLoading(true);
    try {
      await onAdd(todo);
      form.reset();
    } catch (error) {
      setError(ErrorMessagesNotification.ADD);
    }

    setIsLoading(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: allCompleted })}
        data-cy="ToggleAllButton"
        disabled={allCompleted}
      />

      <form onSubmit={handleSubmit}>
        <input
          name="todo"
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          ref={inputRef}
          placeholder="What needs to be done?"
          disabled={isLoading}
        />
      </form>
    </header>
  );
};

export default CreateTodo;
