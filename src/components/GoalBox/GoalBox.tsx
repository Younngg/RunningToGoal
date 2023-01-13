import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { postRepository } from '../../App';
import { GoalType } from '../../types/goal';
import Button from '../Button/Button';
import GoalForm from '../GoalForm/GoalForm';
import ProgressBar from '../ProgressBar/ProgressBar';

interface GoalBoxProps {
  data: GoalType;
  onDelete: (id: string) => void;
  getGoalForEdit: (current: GoalType) => void;
  getGoalForDelete: (current: GoalType) => void;
  onCreatOrUpdateGoal: (goal: GoalType) => void;
}

const GoalBox: FC<GoalBoxProps> = ({
  data,
  onDelete,
  getGoalForEdit,
  onCreatOrUpdateGoal,
  getGoalForDelete,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  return isUpdating ? (
    <GoalForm
      postRepository={postRepository}
      onCloseForm={() => setIsUpdating(false)}
      onCreatOrUpdateGoal={onCreatOrUpdateGoal}
      currentGoal={data}
    />
  ) : (
    <Container>
      <Top>
        <TitleContainer>
          <Title>🏃‍♀️{data.title}</Title>
          <Message>
            목표까지 {data.goal - data.current}
            {data.unit} 남았어요!
          </Message>
        </TitleContainer>
        <ButtonContainer>
          <Button
            content={`${process.env.PUBLIC_URL}/pen.png`}
            onClick={() => setIsUpdating(true)}
          />
          <Button
            content={`${process.env.PUBLIC_URL}/minus.png`}
            onClick={() => getGoalForDelete(data)}
          />
        </ButtonContainer>
      </Top>
      <ProgressBar data={data} getGoalForEdit={getGoalForEdit} />
    </Container>
  );
};

export default GoalBox;

const Container = styled.div`
  width: 100%;
  height: 20rem;
  background-color: white;
  border-radius: 20px;
  padding: 3rem 4rem;
  margin-bottom: 3rem;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-right: 2rem;
`;

const Message = styled.p`
  font-size: 1.4rem;
`;

const ButtonContainer = styled.div`
  display: flex;

  button {
    + button {
      margin-left: 1rem;
    }
  }
`;
