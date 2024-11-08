import { render, screen, waitFor } from '@/tests/test-utils';
import { NextIntlClientProvider } from 'next-intl';

import Page from './page';

const messages = {
  Home: {
    title: 'Templatka',
    content: 'To jest przykładowa treść'
  }
};

describe('HomePage', () => {
  it('should render the children components', async () => {
    render(
      <NextIntlClientProvider locale="pl" messages={messages}>
        <Page />
      </NextIntlClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Templatka/i)).toBeInTheDocument();
    });
  });
});
