import { useQuery } from '@tanstack/react-query';
import { getUsersAction } from '../api/actions';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await getUsersAction();
      
      if (response?.data) {
        return response.data;
      }
      
      throw new Error(response?.serverError || 'Failed to loop up users');
    },
  });
}
