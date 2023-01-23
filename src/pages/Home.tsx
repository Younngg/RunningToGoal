import React, { FC, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { authService } from '../App';
import Button from '../components/Button/Button';
import CurrentModal from '../components/CurrentModal/CurrentModal';
import DeleteModal from '../components/DeleteModal/DeleteModal';
import GoalBox from '../components/GoalBox/GoalBox';
import GoalForm from '../components/GoalForm/GoalForm';
import { PageContainer } from '../styles/page';
import PostRepository from './../services/postRepository';
import type { GoalsResType, GoalType } from './../types/goal';

interface HomeProps {
  postRepository: PostRepository;
}

const Home: FC<HomeProps> = ({ postRepository }) => {
  const { state } = useLocation();
  const [userId, setUserId] = useState(state && state.id);

  const [data, setData] = useState<GoalsResType>({});

  const [isWriting, setIsWriting] = useState(false);

  const [editingGoal, setEditingGoal] = useState<GoalType | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<GoalType | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = postRepository.syncPosts(userId, (posts: GoalsResType) => {
      setData(posts);
    });

    return () => stopSync();
  }, [postRepository, userId]);

  useEffect(() => {
    authService.onAuthChange((user: { uid: any }) => {
      if (user) {
        setUserId(user.uid);
      } else setUserId(null);
    });
  }, []);

  const onLogout = () => {
    authService.logout();
  };

  const onCloseForm = () => {
    isWriting && setIsWriting(false);
  };

  const onCloseModal = (modal: 'edit' | 'delete') => {
    if (modal === 'edit') setEditingGoal(null);
    else if (modal === 'delete') setDeletingGoal(null);
  };

  const getGoalForDelete = (current: GoalType) => {
    setDeletingGoal(current);
  };

  const onDelete = (id: string) => {
    setData((cur: GoalsResType) => {
      const updated = { ...cur };
      delete updated[id];
      return updated;
    });
    postRepository.removePost(userId, id);
    setDeletingGoal(null);
  };

  const onCreatOrUpdateGoal = (goal: GoalType) => {
    setData((goals) => {
      const updated = { ...goals };
      updated[goal.id] = goal;
      return updated;
    });

    postRepository.savePost(userId, goal);
  };

  const getGoalForEdit = (current: GoalType) => {
    setEditingGoal(current);
  };

  if (!userId) {
    return <Navigate to='/login' />;
  }

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
        <GoalForm
          postRepository={postRepository}
          onCloseForm={onCloseForm}
          onCreatOrUpdateGoal={onCreatOrUpdateGoal}
        />
      )}
      {Object.keys(data).map((key) => (
        <GoalBox
          data={data[key]}
          key={key}
          onDelete={onDelete}
          getGoalForEdit={getGoalForEdit}
          getGoalForDelete={getGoalForDelete}
          onCreatOrUpdateGoal={onCreatOrUpdateGoal}
        />
      ))}
      {editingGoal ? (
        <CurrentModal
          goal={editingGoal}
          onCloseModal={onCloseModal}
          onUpdate={onCreatOrUpdateGoal}
        />
      ) : null}
      {deletingGoal ? (
        <DeleteModal
          goal={deletingGoal}
          onCloseModal={onCloseModal}
          onDelete={onDelete}
        />
      ) : null}
      <Button text='로그아웃' onClick={onLogout} />
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
