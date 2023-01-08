import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { GoalType } from '../../types/goal';

interface ProgressBarProps {
  data: GoalType;
}

const ProgressBar: FC<ProgressBarProps> = ({ data }) => {
  const getPercent = () => {
    return (data.current / data.goal) * 100;
  };

  return (
    <Container>
      <Bar percent={getPercent()}>
        <div>
          <RunningMan src={`${process.env.PUBLIC_URL}/run2.png`} />
          <CurrentText percent={getPercent()}>
            {data.current}
            {data.unit}
          </CurrentText>
        </div>
        <GoalText>
          {data.goal}
          {data.unit}
        </GoalText>
      </Bar>
    </Container>
  );
};

export default ProgressBar;

const Container = styled.div`
  padding: 6rem 0;
`;

const Bar = styled.div<{ percent: number }>`
  width: 100%;
  height: 2rem;
  background-color: #e9e8e8;
  border-radius: 25px;
  position: relative;

  div {
    width: ${({ percent }) => percent}%;
    height: 2rem;
    background-color: ${({ theme }) => theme.color.pink};
    border-radius: 25px;
    position: relative;
  }
`;

const CurrentText = styled.span<{ percent: number }>`
  position: absolute;
  right: -0.7rem;
  bottom: -2.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;

  ${({ percent }) =>
    !percent &&
    css`
      display: none;
    `}
`;

const GoalText = styled.span`
  position: absolute;
  right: 0;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
`;

const RunningMan = styled.img`
  position: absolute;
  right: -1.5rem;
  top: -4rem;
  width: 4rem;
`;
