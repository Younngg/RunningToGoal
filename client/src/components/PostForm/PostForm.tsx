import React, { FC, useState, FormEvent } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import type { PostReqType, PostResType } from '../../types/post';
import { Input } from '../../styles/form';
import useCreatePost from '../../queries/useCreatePost';
import useUpdatePost from '../../queries/useUpdatePost';

interface PostFormProps {
  onCloseForm: () => void;
  currentPost?: PostResType;
}

const PostForm: FC<PostFormProps> = ({ onCloseForm, currentPost }) => {
  const [postInput, setPostInput] = useState(
    currentPost ? currentPost.title : ''
  );
  const [postValueInput, setPostValueInput] = useState(
    currentPost ? currentPost.goal.toString() : '0'
  );
  const [unitInput, setUnitInput] = useState(
    currentPost ? currentPost.unit : ''
  );

  const { mutate: createPostMutate } = useCreatePost();
  const { mutate: updatePostMutate } = useUpdatePost();

  const onCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postInput && unitInput && postValueInput !== '0') {
      const newPost: PostReqType = {
        title: postInput,
        goal: parseInt(postValueInput),
        unit: unitInput,
      };

      createPostMutate(newPost);
      onCloseForm();
      return;
    } else alert('모두 입력해주세요');
  };

  const onUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      postInput &&
      unitInput &&
      postValueInput !== '0' &&
      parseInt(postValueInput) >= currentPost!.current
    ) {
      const updatePost: { id: string; post: PostReqType } = {
        id: currentPost!.id,
        post: {
          title: postInput,
          goal: parseInt(postValueInput),
          unit: unitInput,
          current: currentPost!.current,
        },
      };
      updatePostMutate(updatePost);
      onCloseForm();
      return;
    } else if (parseInt(postValueInput) < currentPost!.current) {
      alert('현재 달성한 값 이하로 변경할 수 없습니다.');
    } else if (!(postInput && unitInput && postValueInput !== '0')) {
      alert('모두 입력해주세요.');
    }
  };

  return (
    <Container>
      <form onSubmit={currentPost ? onUpdate : onCreate}>
        <Top>
          <Label htmlFor='post'>목표</Label>
          <Input
            type='text'
            id='post'
            long
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
          />
        </Top>
        <Bottom>
          <div>
            <Label htmlFor='postValue'>목표치</Label>
            <Input
              type='number'
              id='postValue'
              value={postValueInput}
              onChange={(e) => setPostValueInput(e.target.value)}
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

export default PostForm;

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
