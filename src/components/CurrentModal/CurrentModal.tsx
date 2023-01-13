import React, { FC, Dispatch, useState, FormEvent } from 'react';
import styled from 'styled-components';
import { GoalType } from './../../types/goal';
import { Input } from './../../styles/form';
import Button from '../Button/Button';
import {
  BackGround,
  ButtonContainer,
  Message,
  Modal,
  Title,
} from '../../styles/modal';

interface CurrenModalProps {
  goal: GoalType;
  onCloseModal: (modal: 'edit' | 'delete') => void;
  onUpdate: (goal: GoalType) => void;
}

const CurrentModal: FC<CurrenModalProps> = ({
  goal,
  onCloseModal,
  onUpdate,
}) => {
  const [currentInput, setCurrentInput] = useState('0');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentInput && goal.current + parseInt(currentInput) <= goal.goal) {
      const newGoal: GoalType = {
        ...goal,
        current: goal.current + parseInt(currentInput),
      };

      onUpdate(newGoal);
      onCloseModal('edit');
      return;
    } else if (goal.current + parseInt(currentInput) > goal.goal) {
      alert('목표치 이상 입력할 수 없습니다.');
    }
  };
  return (
    <BackGround>
      <Modal>
        <Title>
          <span>🏃‍♀️{goal.title}</span>
          목표와
        </Title>
        <EditForm onSubmit={onSubmit}>
          <div>
            <Input
              type='number'
              defaultValue='0'
              onChange={(e) => setCurrentInput(e.target.value)}
              max={goal.goal}
            />
            <Message>권 더 가까워졌어요.</Message>
          </div>
          <ButtonContainer>
            <Button text='닫기' onClick={() => onCloseModal('edit')} />
            <Button text='추가하기' type='submit' />
          </ButtonContainer>
        </EditForm>
      </Modal>
    </BackGround>
  );
};

export default CurrentModal;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
