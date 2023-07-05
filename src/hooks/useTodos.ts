import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useContext } from 'react';
import { getTodos } from '~/api/todos';
import { constructTodosCacheKey } from '~/helpers/getQueriesCache';
import { ONE_MINUTE } from '~/common/time';
import { AuthContext } from '~/providers/AuthContext';
import { Todo } from '~/types/Todo';

export const useTodos = (): UseQueryResult<Todo[]> => {
  const { user } = useContext(AuthContext);

  return useQuery<Todo[]>(constructTodosCacheKey(user?.id), () => getTodos(String(user?.id)), {
    enabled: !!user?.id,
    cacheTime: ONE_MINUTE,
    staleTime: ONE_MINUTE,
  });
};
