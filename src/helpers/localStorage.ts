import { User } from '~/types/User';

// keys
export const USER = 'user';

// helpers
export const getUserFromLocalStorage = () => window.localStorage.getItem(USER) ?? '';
export const setUserInLocalStorage = (user: User) => window.localStorage.setItem(USER, JSON.stringify(user));
export const removeUserFromLocalStorage = () => window.localStorage.removeItem(USER);
