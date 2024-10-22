// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import qs from 'qs';

import { API_ENDPOINTS, ApiKeysType } from './../hooks/api/apiEndpoints';

type fetchRequestProps = {
  route: ApiKeysType;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  getFile?: boolean;
  refresh?: boolean;
  id?: string;
  params?: { [key: string]: string };
  values?: {
    [key: string]:
      | string
      | number
      | boolean
      | File
      | null
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | { [key: string]: any }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | { [key: string]: any }[];
  };
};

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    current: number;
    from: number;
    last: number;
    to: number;
    total: number;
  };
}

export type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

const API_BASE = 'https://jsonplaceholder.typicode.com';

const generateRequestUrl = ({
  route,
  method,
  values,
  id,
  params
}: Without<fetchRequestProps, 'token'>) => {
  const activeParams = params ? Object.keys(params) : [];
  const activeId = id || (!activeParams.includes('id') ? values?.id : null);
  let url = `${API_BASE}${API_ENDPOINTS[route].endpoint}${activeId ? `/${activeId}` : ''}`;

  if (params || values?.params) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let allParams: { [key: string]: any } = {};

    if (params) {
      allParams = { ...params };
    }

    if (values?.params && typeof values?.params === 'object') {
      allParams = { ...allParams, ...values.params };
    }

    Object.entries(allParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, value);
    });
  }

  if (!values) {
    return url;
  }

  switch (method) {
    case 'GET':
      return (
        url +
        qs.stringify(values, {
          arrayFormat: 'indices',
          skipNulls: true,
          addQueryPrefix: true,
          encode: true,
          strictNullHandling: true,
          allowEmptyArrays: false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          filter: (_prefix, value) => {
            if (value === '') {
              return undefined;
            }

            return value;
          },
          encoder: (value, type) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (type === 'key') {
              return value;
            }

            return encodeURIComponent(value);
          }
        })
      );
    default:
      return url;
  }
};

const generateFormData = ({ values, method }: Pick<fetchRequestProps, 'values' | 'method'>) => {
  const form = new FormData();

  form.append('_method', method);

  if (!values) {
    return form;
  }

  for (const [key, value] of Object.entries(values)) {
    if (value === '' || !value) {
      continue;
    }

    if (Array.isArray(value)) {
      value.map((item, index) => {
        if (typeof item === 'object' && item !== null && !(item instanceof File)) {
          for (const [itemKey, itemValue] of Object.entries(item)) {
            if (Array.isArray(itemValue)) {
              if (itemValue?.length) {
                for (const itemArrayValue of itemValue) {
                  form.append(
                    `${key.replaceAll('_', '.')}[${index}][${itemKey}][]`,
                    itemArrayValue.toString()
                  );
                }
              }
            } else if (typeof itemValue !== 'undefined') {
              form.append(
                `${key.replaceAll('_', '.')}[${index}][${itemKey}]`,
                null === itemValue
                  ? ''
                  : itemValue instanceof File
                    ? itemValue
                    : itemValue
                      ? itemValue.toString()
                      : ''
              );
            }
          }
        } else {
          form.append(`${key.replaceAll('_', '.')}[]`, item);
        }
      });
    } else {
      form.append(
        key.replaceAll('_', '.'),
        null === value ? '' : value instanceof File ? value : value.toString()
      );
    }
  }

  return form;
};

export const fetchRequest = async ({
  route,
  method,
  values,
  id,
  params,
  getFile
}: fetchRequestProps) => {
  try {
    const requestOptions = {
      method: method,
      headers: {
        Accept: 'application/json'
      },
      body: method === 'GET' ? null : generateFormData({ values, method })
    };

    const url = generateRequestUrl({ route, id, method, values, params });

    const res = await fetch(url, requestOptions);

    const { status } = await res;

    if (status !== 200) {
      const { message, data, errors } = await res.json();

      return {
        error: message || data.message || 'Something went wrong during fetching!',
        errors: errors || [],
        status
      };
    } else if (getFile) {
      return { data: await res.blob(), status };
    } else {
      return await res.json();
    }
  } catch {
    return { error: 'Something went wrong during fetching!' };
  }
};
