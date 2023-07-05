// queries
export const constructTodosCacheKey = (userId?: number): any[] => ['todos', userId];

// mutations
export const constructAddTodoKey = (): any[] => ['addTodo'];
export const constructUpdateTodoKey = (): any[] => ['updateTodo'];
export const constructDeleteTodoKey = (): any[] => ['deleteTodo'];
export const constructChangeTodoStatusKey = (): any[] => ['changeTodoStatus'];
export const constructChangeAllTodoStatusKey = (): any[] => ['changeAllTodoStatus'];
