import * as api from './api'
import * as mock from './api.mock'

it('has all endpoints mocked', () => {
  const mockedEndpoints = Object.keys(mock)
  Object.keys(api).forEach((endpoint) => expect(mockedEndpoints).toContain(endpoint))
})
