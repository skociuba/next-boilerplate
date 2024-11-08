'use client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useApiQuery } from './../../hooks/api/useApiQuery';

interface Props {
  user: string;
}

const UserPosts = ({ user }: Props) => {
  const { data, isLoading, error } = useApiQuery({
    route: 'TODO',
    params: {
      id: user
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data.title}</div>;
};

export { UserPosts };
