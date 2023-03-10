import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authService } from '../App';
import Button from '../components/Button/Button';
import CurrentModal from '../components/CurrentModal/CurrentModal';
import DeleteModal from '../components/DeleteModal/DeleteModal';
import PostBox from '../components/PostBox/PostBox';
import PostForm from '../components/PostForm/PostForm';
import useDeletePost from '../queries/useDeletePost';
import useGetPosts from '../queries/useGetPosts';
import { PageContainer } from '../styles/page';
import type { PostResType } from '../types/post';
import { useRecoilValue } from 'recoil';
import { userState } from './../states/userState';

const Home = () => {
  const navigate = useNavigate();

  const user = useRecoilValue(userState);

  const [isWriting, setIsWriting] = useState(false);

  const [editingPost, setEditingPost] = useState<PostResType | null>(null);
  const [deletingPost, setDeletingPost] = useState<PostResType | null>(null);

  const { data: posts } = useGetPosts();
  const { mutate: deletePostMutate } = useDeletePost();

  const onLogout = () => {
    authService.logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  const onCloseForm = () => {
    isWriting && setIsWriting(false);
  };

  const onCloseModal = (modal: 'edit' | 'delete') => {
    if (modal === 'edit') setEditingPost(null);
    else if (modal === 'delete') setDeletingPost(null);
  };

  const getPostForDelete = (current: PostResType) => {
    setDeletingPost(current);
  };

  const onDelete = (id: string) => {
    deletePostMutate(id);
    setDeletingPost(null);
  };

  const getPostForEdit = (current: PostResType) => {
    setEditingPost(current);
  };

  return (
    <PageContainer>
      <Title>
        <ProfileImg
          src={
            user
              ? user.profileImg
              : 'https://res.cloudinary.com/dv6tzjgu4/image/upload/v1671081256/elice/default-user_bvvgsf.png'
          }
          alt='profile image'
        />
        <span>{user && user.nickname}</span> ?????? ????????? ?????? ??????????????????????
      </Title>
      <ButtonContainer>
        <Button
          content={`${process.env.PUBLIC_URL}/plus.png`}
          onClick={() => setIsWriting(true)}
        />
      </ButtonContainer>
      {isWriting && <PostForm onCloseForm={onCloseForm} />}
      {posts &&
        posts.map((post: PostResType) => (
          <PostBox
            data={post}
            key={post.id}
            onDelete={onDelete}
            getPostForEdit={getPostForEdit}
            getPostForDelete={getPostForDelete}
          />
        ))}
      {posts && posts.length === 0 ? (
        <EmptyMessage>????????? ??????????????????!</EmptyMessage>
      ) : null}
      {editingPost ? (
        <CurrentModal post={editingPost} onCloseModal={onCloseModal} />
      ) : null}
      {deletingPost ? (
        <DeleteModal
          post={deletingPost}
          onCloseModal={onCloseModal}
          onDelete={onDelete}
        />
      ) : null}
      <Button text='????????????' onClick={onLogout} />
    </PageContainer>
  );
};

export default Home;

const Title = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 36px;
  display: flex;
  align-items: center;

  span {
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  border: 2px solid white;
  width: 5rem;
  margin-right: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 3rem;
`;

const EmptyMessage = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rem;
`;
