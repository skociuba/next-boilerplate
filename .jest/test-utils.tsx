import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import ReactQueryProvider from '../src/app/[locale]/providers/ReactQueryProvider';

type ProvidersProps = {
  readonly children?: any;
};

const Providers = ({ children }: ProvidersProps) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
