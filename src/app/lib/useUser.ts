import { useUser } from '@auth0/nextjs-auth0/client';


const userFetcher = async () => {
  const res = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
};

export default useUser;