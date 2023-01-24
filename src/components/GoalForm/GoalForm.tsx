import React, { FC, useState, FormEvent } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import type { GoalType, PostReqType } from './../../types/goal';
import { Input } from './../../styles/form';
import useCreatePost from '../../queries/useCreatePost';
import useUpdatePost from './../../queries/useUpdatePost';

interface GoalFormProps {
  onCloseForm: () => void;
  currentGoal?: GoalType;
}

const GoalForm: FC<GoalFormProps> = ({ onCloseForm, currentGoal }) => {
  const [goalInput, setGoalInput] = useState(
    currentGoal ? currentGoal.title : ''
  );
  const [goalValueInput, setGoalValueInput] = useState(
    currentGoal ? currentGoal.goal.toString() : '0'
  );
  const [unitInput, setUnitInput] = useState(
    currentGoal ? currentGoal.unit : ''
  );

  const { mutate: createPostMutate } = useCreatePost();
  const { mutate: updatePostMutate } = useUpdatePost();

  const onCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (goalInput && unitInput && goalValueInput !== '0') {
      const newGoal: PostReqType = {
        title: goalInput,
        goal: parseInt(goalValueInput),
        unit: unitInput,
      };

      createPostMutate(newGoal);
      onCloseForm();
      return;
    } else alert('모두 입력해주세요');
  };

  const onUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      goalInput &&
      unitInput &&
      goalValueInput !== '0' &&
      parseInt(goalValueInput) >= currentGoal!.current
    ) {
      const updateGoal: { id: string; post: PostReqType } = {
        id: currentGoal!.id,
        post: {
          title: goalInput,
          goal: parseInt(goalValueInput),
          unit: unitInput,
          current: currentGoal!.current,
        },
      };
      updatePostMutate(updateGoal);
      onCloseForm();
      return;
    } else if (parseInt(goalValueInput) < currentGoal!.current) {
      alert('현재 달성한 값 이하로 변경할 수 없습니다.');
    } else if (!(goalInput && unitInput && goalValueInput !== '0')) {
      alert('모두 입력해주세요.');
    }
  };

  return (
    <Container>
      <form onSubmit={currentGoal ? onUpdate : onCreate}>
        <Top>
          <Label htmlFor='goal'>목표</Label>
          <Input
            type='text'
            id='goal'
            long
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
          />
        </Top>
        <Bottom>
          <div>
            <Label htmlFor='goalValue'>목표치</Label>
            <Input
              type='number'
              id='goalValue'
              value={goalValueInput}
              onChange={(e) => setGoalValueInput(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='unit'>단위</Label>
            <Input
              type='text'
              id='unit'
              value={unitInput}
              onChange={(e) => setUnitInput(e.target.value)}
            />
          </div>
        </Bottom>
        <ButtonContainer>
          <Button
            type='submit'
            content='https://res.cloudinary.com/dtdzphcq7/image/upload/v1674479809/plus_dkzsdb.png'
          />
          <Button
            content='https://res.cloudinary.com/dtdzphcq7/image/upload/v1674479809/minus_rt3ktt.png'
            onClick={onCloseForm}
          />
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default GoalForm;

const Container = styled.div`
  width: 100%;
  height: 20rem;
  background-color: white;
  border-radius: 20px;
  padding: 3rem 4rem;
  font-size: 1.5rem;
  margin-bottom: 3rem;

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Top = styled.div`
  margin-bottom: 2rem;
`;

const Bottom = styled.div`
  display: flex;
  margin-bottom: 2rem;

  div {
    width: 50%;
  }
`;

const Label = styled.label`
  display: inline-block;
  width: 8rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;

  button {
    + button {
      margin-left: 1rem;
    }
  }
`;
