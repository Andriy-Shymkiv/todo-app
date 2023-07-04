import axios from 'axios';
import { BASE_URL } from '~/common/constants';
import { Todo } from '~/types/Todo';

export const getTodos = async (userId: string): Promise<Todo[]> => {
  const { data: todos } = await axios.get(`${BASE_URL}/todos?userId=${userId}`);

  return todos;
};

export const addTodo = async (todo: Todo): Promise<any> => {
  return await axios.post(`${BASE_URL}/todos`, todo);
};

export const removeTodo = async (todoId: number): Promise<any> => {
  return await axios.delete(`${BASE_URL}/todos/${todoId}`);
};

export const updateTodo = async (todoId: number, todo: Todo): Promise<any> => {
  return await axios.patch(`${BASE_URL}/todos/${todoId}`, todo);
};
