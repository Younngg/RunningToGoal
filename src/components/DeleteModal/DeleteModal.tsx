import React, { FC } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import {
  BackGround,
  ButtonContainer,
  Message,
  Modal,
  Title,
} from './../../styles/modal';
import type { GoalType } from './../../types/goal';

interface DeleteModalProps {
  goal: GoalType;
  onCloseModal: (modal: 'edit' | 'delete') => void;
  onDelete: (id: string) => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  goal,
  onCloseModal,
  onDelete,
}) => {
  return (
    <BackGround>
      <Modal>
        <ModalTitle>삭제</ModalTitle>
        <Message>{goal.title} 목표를 삭제하시겠습니까?</Message>
        <ButtonContainer>
          <Button text='닫기' onClick={() => onCloseModal('delete')} />
          <Button text='삭제하기' onClick={() => onDelete(goal.id)} />
        </ButtonContainer>
      </Modal>
    </BackGround>
  );
};

export default DeleteModal;

const ModalTitle = styled(Title)`
  font-weight: bold;
`;
