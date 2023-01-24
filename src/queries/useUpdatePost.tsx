import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { PostReqType } from '../types/post';
import { postApi } from '../services/postApi';

const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, post }: { id: string; post: PostReqType | { current: number } }) =>
      postApi.updatePost(id, post),
    {
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['posts', id] });
      },
    }
  );
};

export default useUpdatePost;
