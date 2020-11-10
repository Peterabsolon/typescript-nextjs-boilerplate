import { AxiosInstance } from 'axios'

import { IApi } from './api.interface'
import { mockApi } from './mocks'

// Passed in are client instances with Authorization header configured from the store
export const createApi = (useMocks: boolean, axios: AxiosInstance): IApi => {
  if (useMocks) {
    // Typecheck all requests have mocks
    return mockApi
  }

  // prettier-ignore
  return {
    // Auth
    loginAdmin: (creds) => axios.post('/api/authorization/token', creds).then(r => r.data),

    // Enums
    getPalletTypes: () => axios.get('/api/common/pallettypes').then(r => r.data),

    // Packing
    getOrder: (num) => axios.get(`/api/packing/${num}`).then(r => r.data),
  }
}
