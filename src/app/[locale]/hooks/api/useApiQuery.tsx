import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { fetchRequest } from './../../lib/api';
import { ApiKeysType } from './apiEndpoints';

export type UseApiQueryProps = {
  route: ApiKeysType;
  getFile?: boolean;
  id?: string;
  refresh?: boolean;
  params?: { [key: string]: string };
  values?: {
    [key: string]: string | string[] | number | boolean | File | null;
  };
  enabled?: boolean;
};

export const useApiQuery = ({ refresh, ...props }: UseApiQueryProps) => {
  const { route, id, params } = props;
  const paramsArr = params ? [...Object.values(params)] : [];

  const { data, ...query } = useQuery({
    queryKey: [route, id, ...paramsArr],
    enabled: typeof props.enabled === 'boolean' ? props.enabled : true,
    queryFn: () =>
      fetchRequest({
        refresh,
        method: 'GET',
        ...props
      }).then((data) => {
        if (data?.status && data.status === 403) {
          toast('Brak dostepu', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            type: 'error',
            theme: 'colored'
          });
        }

        return data;
      })
    // useErrorBoundary: true,
  });

  return { data: data, ...query };
};
