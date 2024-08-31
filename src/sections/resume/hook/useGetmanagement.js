import { useQuery } from '@tanstack/react-query';
import getManagement from '../service';

const useGetManagement = (id) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['getManagement', id],
    queryFn: () => getManagement(id),
  });

  return {
    data,
    isLoading,
    error,
    isError,
  };
};

export default useGetManagement;
