import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { fetchRequest } from './../../lib/api';
import { ApiKeysType } from './apiEndpoints';

export type UseApiMutationProps = {
  route: ApiKeysType;
  getFile?: boolean;
  id?: string;
  values?: { [key: string]: string };
  params?: { [key: string]: string };
  method: 'POST' | 'PUT' | 'DELETE' | 'GET' | 'PATCH';
  onSuccess?: (data: any) => void;
};

export type ValueType = {
  [key: string]:
    | string
    | number
    | boolean
    | File
    | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | { [key: string]: any }
    | { [key: string]: any }[];
};

export const useApiMutation = ({ ...props }: UseApiMutationProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string } | undefined>();

  const { mutate, isLoading } = useMutation({
    onSuccess: props.onSuccess,
    mutationFn: (values: ValueType) =>
      fetchRequest({
        refresh: true,
        values,
        ...props
      })
        .then((data) => {
          if (data?.errors) {
            setErrors(data.errors);
          }

          if (data?.status === 403) {
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
        .catch((err) => err),
    useErrorBoundary: true
  });

  return { mutate, isLoading, errors };
};
