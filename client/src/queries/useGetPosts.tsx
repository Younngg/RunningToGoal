import { useQuery } from '@tanstack/react-query';
import { postApi } from '../services/postApi';

const useGetPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postApi.getPosts,
  });
};

export default useGetPosts;
