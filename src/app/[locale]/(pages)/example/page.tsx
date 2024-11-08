'use client';
import dynamic from 'next/dynamic';

import { Layout } from './../../components/Example/Layout';
import { useApiQuery } from './../../hooks/api/useApiQuery';

const Example = dynamic(
  () => import('./../../components/PageComponents/Example').then((m) => m.Example),
  {
    ssr: false
  }
);

const Page = () => {
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
      <Example data={data} />
    </Layout>
  );
};

export default Page;
