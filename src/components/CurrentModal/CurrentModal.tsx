import React, { FC, Dispatch, useState, FormEvent } from 'react';
import styled from 'styled-components';
import { GoalType, PostReqType } from './../../types/goal';
import { Input } from './../../styles/form';
import Button from '../Button/Button';
import useUpdatePost from './../../queries/useUpdatePost';
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
}

const CurrentModal: FC<CurrenModalProps> = ({ goal, onCloseModal }) => {
  const [currentInput, setCurrentInput] = useState('0');
  const { mutate: updatePostMutate } = useUpdatePost();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentInput && goal.current + parseInt(currentInput) <= goal.goal) {
      const newPost: { id: string; post: PostReqType } = {
        id: goal.id,
        post: {
          title: goal.title,
          goal: goal.goal,
          unit: goal.unit,
          current: goal.current + parseInt(currentInput),
        },
      };

      updatePostMutate(newPost);
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
