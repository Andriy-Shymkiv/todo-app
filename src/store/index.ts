import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

import modalSlice from './modal/slice';
import appSlice from './app/slice';

const rootReducer = combineReducers({
  app: appSlice,
  modal: modalSlice,
});

const setupStore = (): { store: ToolkitStore } => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return { store };
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['store']['dispatch'];

export const { store } = setupStore();
