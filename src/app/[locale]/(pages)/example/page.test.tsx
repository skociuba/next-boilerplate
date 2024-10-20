import { render, screen } from '@/tests/test-utils';
import { waitFor } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';

import { useApiQuery } from './../../hooks/api/useApiQuery';
import Example from './page';

jest.mock('./../../hooks/api/useApiQuery');

describe('Example component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state initially', () => {
    (useApiQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });

    render(<Example />);

    expect(screen.queryByText('delectus aut autem')).not.toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    (useApiQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Failed to fetch' }
    });

    render(<Example />);

    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });

  it('displays data when fetch is successful', async () => {
    (useApiQuery as jest.Mock).mockReturnValue({
      data: [
        {
          userId: 1,
          id: 1,
          title: 'delectus aut autem',
          completed: false
        }
      ],
      isLoading: false,
      error: null
    });

    render(<Example />);

    await waitFor(() => {
      expect(screen.getByText('delectus aut autem')).toBeInTheDocument();
    });
  });
});
