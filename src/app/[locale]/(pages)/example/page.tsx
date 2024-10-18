'use client';
import React from 'react';
import { useApiQuery } from './../../hooks/api/useApiQuery';
const Example = () => {
  const { data, isLoading, error } = useApiQuery({
    route: 'TODOS'
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }
  return (
    <div className="mx-auto mt-4 px-4 max-w-screen-lg">
      {data && (
        <div>
          {Array.isArray(data) &&
            data.map(({ title, id }: { title: string; id: string }) => (
              <div key={id} className="flex flex-row">
                <p className="w-2/3">{title}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Example;
