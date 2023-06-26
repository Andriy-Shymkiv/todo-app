import axios from 'axios';
import { BASE_URL } from '~/common/constants';
import { User } from '../types/User';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const { data: users } = await axios.get(`${BASE_URL}/users?email=${email}`);

  return users[0] || null;
};

type UserData = Pick<User, 'name' | 'email'>;

export const createUser = async ({ email, name }: UserData): Promise<User> => {
  return axios.post(`${BASE_URL}/users`, { email, name });
};
