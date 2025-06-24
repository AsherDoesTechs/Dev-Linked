import useSWR from 'swr';

const userFetcher = async () => {
  const res = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
};

const useUser = () => {
  const { data, error, isLoading } = useSWR('/api/auth/me', userFetcher);

  return {
    user: data,
    isLoading,
    error,
  };
};

export default useUser;