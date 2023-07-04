import { User } from '~/types/User';

// keys
export const USER = 'user';

// helpers
export const getUserFromLocalStorage = (): string => window.localStorage.getItem(USER) ?? '';
export const setUserInLocalStorage = (user: User): void => window.localStorage.setItem(USER, JSON.stringify(user));
export const removeUserFromLocalStorage = (): void => window.localStorage.removeItem(USER);
