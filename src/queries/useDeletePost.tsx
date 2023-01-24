import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from './../services/postRepository';

const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation((id: string) => postApi.deletePost(id), {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
};

export default useDeletePost;
