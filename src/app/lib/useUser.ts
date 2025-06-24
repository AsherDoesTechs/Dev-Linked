import useSWR from 'swr';

const userFetcher = async () => {
  const res = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  });

  if (res.status === 401) return null;
  if (!res.ok) throw new Error('Failed to fetch user');

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
