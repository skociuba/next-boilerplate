export type ApiEndpointsType = {
  endpoint: string;
  method: ('GET' | 'POST' | 'PUT' | 'DELETE')[];
};

export type ApiKeysType = 'TODOS' | 'TODO' | 'TODO_UPDATE' | 'TODO_ADD';

export const API_ENDPOINTS: { [key in ApiKeysType]: ApiEndpointsType } = {
  TODOS: {
    endpoint: `/todos`,
    method: ['GET']
  },

  TODO: {
    endpoint: `/todos/{id}`,
    method: ['GET']
  },
  TODO_UPDATE: {
    endpoint: `/todos/{id}`,
    method: ['PUT', 'DELETE']
  },
  TODO_ADD: {
    endpoint: `/todos`,
    method: ['POST']
  }
};
