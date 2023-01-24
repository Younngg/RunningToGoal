import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authService } from '../App';
import Button from '../components/Button/Button';
import CurrentModal from '../components/CurrentModal/CurrentModal';
import DeleteModal from '../components/DeleteModal/DeleteModal';
import GoalBox from '../components/GoalBox/GoalBox';
import GoalForm from '../components/GoalForm/GoalForm';
import useDeletePost from '../queries/useDeletePost';
import useGetPosts from '../queries/useGetPosts';
import { PageContainer } from '../styles/page';
import PostRepository from './../services/postRepository';
import type { GoalsResType, GoalType, PostResType } from './../types/goal';
import useCreatePost from './../queries/useCreatePost';
import useUpdatePost from './../queries/useUpdatePost';

interface HomeProps {
  postRepository: PostRepository;
}

const userId = localStorage.getItem('token');

const Home: FC<HomeProps> = ({ postRepository }) => {
  const navigate = useNavigate();

  const [isWriting, setIsWriting] = useState(false);

  const [editingGoal, setEditingGoal] = useState<GoalType | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<GoalType | null>(null);

  const { data: posts } = useGetPosts();
  const { mutate: deletePostMutate } = useDeletePost();

  useEffect(() => {
    authService.onAuthChange((user: { uid: any }) => {
      if (user) {
        localStorage.setItem('token', user.uid);
      }
    });
  }, []);

  const onLogout = () => {
    authService.logout();
    localStorage.removeItem('token');
    navigate('/');
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
    deletePostMutate(id);
    setDeletingGoal(null);
  };

  const getGoalForEdit = (current: GoalType) => {
    setEditingGoal(current);
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
      {isWriting && <GoalForm onCloseForm={onCloseForm} />}
      {posts &&
        posts.map((post: PostResType) => (
          <GoalBox
            data={post}
            key={post.id}
            onDelete={onDelete}
            getGoalForEdit={getGoalForEdit}
            getGoalForDelete={getGoalForDelete}
          />
        ))}
      {editingGoal ? (
        <CurrentModal goal={editingGoal} onCloseModal={onCloseModal} />
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
