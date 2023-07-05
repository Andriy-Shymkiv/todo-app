import { createSlice } from '@reduxjs/toolkit';

type AppState = {
  selectedTodoId: number | null;
};

const initialState: AppState = {
  selectedTodoId: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedTodoId: (state: AppState, { payload }: { payload: AppState['selectedTodoId'] }) => {
      state.selectedTodoId = payload;
    },
  },
});

export const { setSelectedTodoId } = appSlice.actions;

export default appSlice.reducer;
