import { CityWeather, Fact } from './models'

export const getFacts = (): Promise<Fact[]> =>
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
  ])

export const getCityWeather = (): Promise<CityWeather> =>
  Promise.resolve({
    id: '1',
    weather: {
      summary: {
        title: 'Na mikinu :D',
        description: 'Na mikinu zevraj',
      },
    },
  })

export const someMutation = (): Promise<void> => Promise.resolve()
