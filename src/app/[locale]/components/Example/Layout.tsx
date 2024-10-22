import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';
import { cn } from './../../lib/utils/cn';
import { FormMessage } from './../FormMessage/index';
import { Container } from './components/Container';
import { IntroProps } from './components/Intro';
export type LayoutProps = {
  children?: React.ReactElement;
  loading?: boolean;
  error?: string;
} & IntroProps;

const Intro = dynamic(() => import('./components/Intro').then((m) => m.Intro), {
  ssr: false
});

export const Layout = ({ children, error, loading, ...props }: LayoutProps) => {
  return (
    <div className="flex flex-col gap-9 pt-12 pb-24">
      {error ? <FormMessage success={false}>{error}</FormMessage> : null}
      <Container className={cn('flex flex-col md:gap-9')}>
        <div className="text-primary flex flex-col gap-7 pb-8 md:pb-0">
          <Intro {...props} />
        </div>
        {loading ? <Skeleton width={1000} height={24} count={10} /> : children}
      </Container>
    </div>
  );
};
