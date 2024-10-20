'use client';
import React from 'react';

import { Layout } from './../../components/Example/Layout';
import { useApiQuery } from './../../hooks/api/useApiQuery';
const Example = () => {
  const { data, isLoading, error } = useApiQuery({
    route: 'TODOS'
  });

  return (
    <Layout
      {...{
        title: 'examplePage.title',
        breakpoints: [{ children: 'main', href: '/' }],
        hideOnMobile: { title: true, subTitle: true },
        loading: isLoading,
        error: error?.message
      }}
    >
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
    </Layout>
  );
};

export default Example;
