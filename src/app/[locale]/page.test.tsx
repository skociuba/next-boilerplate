import { render, screen } from '@/tests/test-utils';
import { NextIntlClientProvider } from 'next-intl';

import HomePage from './page';
import ReactQueryProvider from './providers/ReactQueryProvider';

const messages = {
  Home: {
    title: 'Templatka',
    content: 'To jest przykładowa treść'
  }
};

describe('HomePage ', () => {
  it('should render the children components', () => {
    render(
      <NextIntlClientProvider locale="pl" messages={messages}>
        <ReactQueryProvider>
          <HomePage />
        </ReactQueryProvider>
      </NextIntlClientProvider>
    );

    // Assert
    screen.getByText(/Templatka/i);
  });
});