import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import {
  selectTodosError,
  selectTodosLoading,
  setError,
  setLoading,
  setTodos,
} from './features/todos';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App = () => {
  const dispach = useAppDispatch();
  const isLoading = useAppSelector(selectTodosLoading);
  const hasError = useAppSelector(selectTodosError);

  useEffect(() => {
    dispach(setLoading(true));
    getTodos()
      .then(todos => {
        dispach(setTodos(todos));
      })
      .catch(error => {
        dispach(setError(error.message));
      });
  }, [dispach]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && !hasError && <TodoList />}
              {hasError && <p className="notification is-danger">{hasError}</p>}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
