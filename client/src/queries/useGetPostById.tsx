import { useQuery } from '@tanstack/react-query';
import { postApi } from '../services/postApi';

const useGetPostById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postApi.getPostById(id!),
  });
};

export default useGetPostById;
