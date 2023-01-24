import { FC, useState, FormEvent } from 'react';
import styled from 'styled-components';
import type { PostReqType, PostResType } from '../../types/post';
import { Input } from './../../styles/form';
import Button from '../Button/Button';
import useUpdatePost from './../../queries/useUpdatePost';
import {
  BackGround,
  ButtonContainer,
  Message,
  Modal,
  Title,
} from '../../styles/modal';

interface CurrenModalProps {
  post: PostResType;
  onCloseModal: (modal: 'edit' | 'delete') => void;
}

const CurrentModal: FC<CurrenModalProps> = ({ post, onCloseModal }) => {
  const [currentInput, setCurrentInput] = useState('0');
  const { mutate: updatePostMutate } = useUpdatePost();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentInput && post.current + parseInt(currentInput) <= post.goal) {
      const newPost: { id: string; post: PostReqType } = {
        id: post.id,
        post: {
          title: post.title,
          goal: post.goal,
          unit: post.unit,
          current: post.current + parseInt(currentInput),
        },
      };

      updatePostMutate(newPost);
      onCloseModal('edit');
      return;
    } else if (post.current + parseInt(currentInput) > post.goal) {
      alert('목표치 이상 입력할 수 없습니다.');
    }
  };
  return (
    <BackGround>
      <Modal>
        <Title>
          <span>🏃‍♀️{post.title}</span>
          목표와
        </Title>
        <EditForm onSubmit={onSubmit}>
          <div>
            <Input
              type='number'
              defaultValue='0'
              onChange={(e) => setCurrentInput(e.target.value)}
              max={post.goal}
            />
            <Message>권 더 가까워졌어요.</Message>
          </div>
          <ButtonContainer>
            <Button text='닫기' onClick={() => onCloseModal('edit')} />
            <Button text='추가하기' type='submit' />
          </ButtonContainer>
        </EditForm>
      </Modal>
    </BackGround>
  );
};

export default CurrentModal;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
