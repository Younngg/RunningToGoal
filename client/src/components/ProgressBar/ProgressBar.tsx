import { FC } from 'react';
import styled, { css } from 'styled-components';
import type { PostResType } from '../../types/post';

interface ProgressBarProps {
  data: PostResType;
  getPostForEdit: (current: PostResType) => void;
}

const ProgressBar: FC<ProgressBarProps> = ({ data, getPostForEdit }) => {
  const getPercent = () => {
    return (data.current / data.goal) * 100;
  };

  return (
    <Container>
      <Bar percent={getPercent()}>
        <div>
          <EditCurrent>
            <EditCurrentButton onClick={() => getPostForEdit(data)}>
              <RunningMan src={`${process.env.PUBLIC_URL}/run2.png`} />
            </EditCurrentButton>
            <p className='infoMessage'>현재 값을 수정하려면 클릭해주세요!</p>
          </EditCurrent>
          <CurrentText percent={getPercent()}>
            ↑<br />
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

  & > div {
    width: ${({ percent }) => percent}%;
    height: 2rem;
    background-color: ${({ theme }) => theme.color.pink};
    border-radius: 25px;
    position: relative;
    transition: all 1s;
  }
`;

const CurrentText = styled.p<{ percent: number }>`
  width: 5rem;
  position: absolute;
  right: -2.5rem;
  bottom: -2.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;

  ${({ percent }) =>
    !percent || percent === 100
      ? css`
          display: none;
        `
      : null}
`;

const GoalText = styled.span`
  width: 7rem;
  position: absolute;
  right: -3.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
`;

const EditCurrent = styled.div`
  position: absolute;
  right: -2rem;
  top: -4rem;
  width: fit-content;

  .infoMessage {
    display: none;
    position: absolute;
    font-size: 1.3rem;
    line-height: 1.6;
    width: 14rem;
    padding: 0.5rem;
    background-color: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    .infoMessage {
      display: block;
    }
  }
`;

const RunningMan = styled.img`
  width: 4rem;
`;

const EditCurrentButton = styled.button`
  width: fit-content;
  padding: 0;
  background-color: transparent;
  border: none;
`;
