import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import GoalBox from '../components/GoalBox/GoalBox';
import GoalForm from '../components/GoalForm/GoalForm';
import { PageContainer } from '../styles/page';
import PostRepository from './../services/postRepository';
import { GoalsResType, GoalType } from './../types/goal';

interface HomeProps {
  postRepository: PostRepository;
}

const Home: FC<HomeProps> = ({ postRepository }) => {
  const [data, setData] = useState<GoalsResType>({});

  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    postRepository.syncPosts((posts: GoalsResType) => {
      setData(posts);
    });
  }, [postRepository]);

  const onCloseForm = () => setIsWriting(false);

  const onDelete = (id: string) => {
    setData((cur: GoalsResType) => {
      const updated = { ...cur };
      delete updated[id];
      return updated;
    });
    postRepository.removePost(id);
  };

  return (
    <PageContainer>
      <Title>
        <span>정지영</span> 님의 목표를 향한 달리기
      </Title>
      <ButtonContainer>
        <Button
          content={`${process.env.PUBLIC_URL}/plus.png`}
          onClick={() => setIsWriting(true)}
        />
      </ButtonContainer>
      {isWriting && (
        <GoalForm postRepository={postRepository} onCloseForm={onCloseForm} />
      )}
      {Object.keys(data).map((key) => (
        <GoalBox data={data[key]} key={key} onDelete={onDelete} />
      ))}
    </PageContainer>
  );
};

export default Home;

const Title = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 36px;

  span {
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 3rem;
`;
