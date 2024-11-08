import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import ReactQueryProvider from '../src/app/[locale]/providers/ReactQueryProvider';
import { NextIntlClientProvider } from 'next-intl';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pick from 'lodash/pick';
import messages from '../messages/en.json';

type ProvidersProps = {
  readonly children?: any;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider
        locale="en"
        messages={pick(messages, ['Navigation', 'LocaleSwitcher', 'layout', 'breakpoints', 'Home'])}
      >
        {children}
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
