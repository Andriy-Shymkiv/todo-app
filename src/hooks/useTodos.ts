import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTodos } from '~/api/todos';
import { ONE_MINUTE } from '~/common/time';
import { Todo } from '~/types/Todo';

export const constructTodosCacheKey = (userId: string): any[] => ['todos', userId];

export const useTodos = (userId?: string): UseQueryResult<Todo[]> => {
  return useQuery<Todo[]>(constructTodosCacheKey(userId ?? ''), () => getTodos(userId ?? ''), {
    enabled: !!userId,
    cacheTime: ONE_MINUTE,
    staleTime: ONE_MINUTE,
  });
};
