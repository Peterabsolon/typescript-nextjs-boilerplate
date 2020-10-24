// TODO: https://mswjs.io/ seems much better for this, this works for now

import { IApi } from './api.interface'

export const mocks: IApi = {
  getFacts: () =>
    Promise.resolve([
      {
        _id: '1',
        text: `Esse esse culpa enim eiusmod esse do cillum. Dolor velit mollit et cupidatat excepteur consectetur.`,
      },
      {
        _id: '2',
        text: `Consectetur dolor et voluptate labore nostrud commodo. Nulla sint duis dolore eiusmod eu dolore fugiat.`,
      },
      {
        _id: '3',
        text: `Voluptate qui nulla do minim sit cillum Lorem.`,
      },
    ]),

  getCityWeather: () =>
    Promise.resolve({
      id: '1',
      weather: {
        summary: {
          title: 'Na mikinu zevraj',
          description: 'Na mikinu zevraj',
        },
      },
    }),

  someMutation: () => Promise.resolve(),
}
