import { FC, useState } from 'react';
import styled from 'styled-components';
import type { PostResType } from '../../types/post';
import Button from '../Button/Button';
import PostForm from '../PostForm/PostForm';
import ProgressBar from '../ProgressBar/ProgressBar';

interface PostBoxProps {
  data: PostResType;
  onDelete: (id: string) => void;
  getPostForEdit: (current: PostResType) => void;
  getPostForDelete: (current: PostResType) => void;
}

const PostBox: FC<PostBoxProps> = ({
  data,
  getPostForEdit,
  getPostForDelete,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  return isUpdating ? (
    <PostForm onCloseForm={() => setIsUpdating(false)} currentPost={data} />
  ) : (
    <Container>
      <Top>
        <TitleContainer>
          <Title>🏃‍♀️{data.title}</Title>
          <Message>
            {data.goal - data.current === 0
              ? '목표를 달성했어요!🎉'
              : `목표까지 ${data.goal - data.current}
            ${data.unit} 남았어요!`}
          </Message>
        </TitleContainer>
        <ButtonContainer>
          <Button
            content={`${process.env.PUBLIC_URL}/pen.png`}
            onClick={() => setIsUpdating(true)}
          />
          <Button
            content={`${process.env.PUBLIC_URL}/minus.png`}
            onClick={() => getPostForDelete(data)}
          />
        </ButtonContainer>
      </Top>
      <ProgressBar data={data} getPostForEdit={getPostForEdit} />
    </Container>
  );
};

export default PostBox;

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
