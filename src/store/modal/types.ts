export enum ModalType {
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
  // UPDATE_TODO = 'UPDATE_TODO',
}

export type OpenModalInput = {
  modalType: ModalType;
};
