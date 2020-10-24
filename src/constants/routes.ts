export enum RouteEnum {
  HOME = '/',
  OTHER = '/other',
}

export const RouteLabels: { [key in RouteEnum]: string } = {
  [RouteEnum.HOME]: 'Home',
  [RouteEnum.OTHER]: 'Other',
}
