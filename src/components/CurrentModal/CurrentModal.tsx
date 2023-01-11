import React, { FC, Dispatch, useState, FormEvent } from 'react';
import styled from 'styled-components';
import { GoalType } from './../../types/goal';
import { Input } from './../../styles/form';
import Button from '../Button/Button';

interface CurrenModalProps {
  goal: GoalType;
  setIsOpenModal: Dispatch<React.SetStateAction<boolean>>;
  onUpdate: (goal: GoalType) => void;
}

const CurrentModal: FC<CurrenModalProps> = ({
  goal,
  setIsOpenModal,
  onUpdate,
}) => {
  const [currentInput, setCurrentInput] = useState('0');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentInput) {
      const newGoal: GoalType = {
        ...goal,
        current: goal.current + parseInt(currentInput),
      };

      onUpdate(newGoal);
      setIsOpenModal(false);
      return;
    } else alert('모두 입력해주세요');
  };
  return (
    <BackGround>
      <Modal>
        <Title>
          <span>{goal.title}</span>
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
            <Button content='' type='submit'></Button>
            <Button content='' onClick={() => setIsOpenModal(false)}></Button>
          </ButtonContainer>
        </EditForm>
      </Modal>
    </BackGround>
  );
};

export default CurrentModal;

const BackGround = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
`;

const Modal = styled.div`
  width: 40rem;
  height: 25rem;
  padding: 3rem;
  background-color: white;
  border-radius: 15px;
`;

const Title = styled.h4`
  font-size: 1.6rem;
  margin-bottom: 5rem;
  span {
    display: inline-block;
    margin-right: 1rem;
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Message = styled.p`
  display: inline-block;
  font-size: 1.6rem;
  margin-left: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: 5rem;

  button {
    + button {
      margin-left: 1rem;
    }
  }
`;
