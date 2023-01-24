import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { PostReqType } from '../types/post';
import { postApi } from '../services/postApi';

const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation((post: PostReqType) => postApi.createPost(post), {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
};

export default useCreatePost;
