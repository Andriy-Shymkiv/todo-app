import { Modal } from '@mui/material';
import { useModalState } from 'src/store/modal/hooks/useModalState';
import { ModalType } from 'src/store/modal/types';
import { Card, styled } from '@mui/material';
import { DeleteTodoModal } from './DeleteTodoModal';
import { AddTodoModal } from './AddTodoModal';

const modalComponents = {
  [ModalType.ADD_TODO]: AddTodoModal,
  // [ModalType.UPDATE_TODO]: UpdateTodoModal,
  [ModalType.DELETE_TODO]: DeleteTodoModal,
};

const StyledModal = styled(Modal, {
  name: 'StyledModal',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

const StyledModalContentWrapper = styled(Card, {
  name: 'StyledModalContentWrapper',
})(({ theme }) => ({
  width: '100%',
  maxWidth: 580,
  padding: theme.spacing(10),
}));

interface ModalContainerProps {
  modalProps?: any;
}

export const ModalContainer: React.FC<ModalContainerProps> = ({ modalProps }) => {
  const { currentModal, closeModal } = useModalState();

  const Modal = currentModal ? modalComponents[currentModal.modalType] : null;

  return (
    <StyledModal open={!!currentModal} onClose={closeModal}>
      <StyledModalContentWrapper>{Modal && <Modal {...modalProps} />}</StyledModalContentWrapper>
    </StyledModal>
  );
};
