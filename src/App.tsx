import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import TodoList from './components/TodoList';
import ErrorMessages from './components/ErrorMessages';
import { ErrorMessagesProps } from './components/ErrorMessages';

export const App: React.FC<ErrorMessagesProps> = ({ error, setError }) => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoList />
      </div>
      <ErrorMessages error={error} setError={setError} />
    </div>
  );
};
