import { render, screen } from '@/tests/test-utils';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import HomePage from './page';

const messages = {
  Home: {
    title: 'Templatka'
  }
};

describe('HomePage ', () => {
  it('should render the children components', () => {
    render(
      <NextIntlClientProvider locale="pl" messages={messages}>
        <HomePage />
      </NextIntlClientProvider>
    );

    // Assert
    screen.getByText(/Templatka/i);
  });
});
