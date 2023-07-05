import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useMemo } from 'react';
import toast from 'react-hot-toast';
import { addTodo } from '~/api/todos';
import { AuthContext } from '~/providers/AuthContext';
import { useModalState } from '~/store/modal/hooks/useModalState';
import { Todo } from '~/types/Todo';
import { constructAddTodoKey, constructTodosCacheKey } from '~/helpers/getQueriesCache';

export const useAddTodo = (): UseMutationResult<any, unknown, Todo> => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { closeModal } = useModalState();

  const onAddTodo = useCallback((todo: Todo): Promise<any> => {
    return addTodo(todo);
  }, []);

  const callbacks = useMemo(
    () => ({
      onSuccess: (): void => {
        toast.success('Todo added');
        queryClient.invalidateQueries(constructTodosCacheKey(user?.id));
        closeModal();
      },
      onError: (): void => {
        toast.error('Error adding todo');
      },
    }),
    [closeModal, queryClient, user?.id],
  );

  return useMutation(constructAddTodoKey(), onAddTodo, callbacks);
};
