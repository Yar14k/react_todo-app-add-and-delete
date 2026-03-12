import { Todo } from './TodoList';

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type FilterBarProps = {
  todos: Todo[];
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

const Footer: React.FC<FilterBarProps> = ({ todos, filter, setFilter }) => {
  const filters = [
    { value: Filter.All, label: 'All', href: '#/', cy: 'FilterLinkAll' },
    {
      value: Filter.Active,
      label: 'Active',
      href: '#/active',
      cy: 'FilterLinkActive',
    },
    {
      value: Filter.Completed,
      label: 'Completed',
      href: '#/completed',
      cy: 'FilterLinkCompleted',
    },
  ];

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todos.filter(todo => !todo.completed).length} items left
          </span>

          <nav className="filter" data-cy="Filter">
            {filters.map(({ value, label, href, cy }) => (
              <a
                key={value}
                href={href}
                data-cy={cy}
                className={`filter__link ${filter === value ? 'selected' : ''}`}
                onClick={() => setFilter(value)}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={todos.every(todo => !todo.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

export default Footer;
