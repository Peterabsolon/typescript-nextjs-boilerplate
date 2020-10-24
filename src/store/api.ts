import axios, { AxiosInstance } from 'axios'
import { GraphQLClient } from 'graphql-request'
import { action, makeAutoObservable } from 'mobx'
import { createApi, IApi } from '~/api'
import { API_URL } from '~/constants'

export class ApiStore {
  useMocks = false

  constructor(readonly token?: string) {
    makeAutoObservable(this)
  }

  get headers(): IAnyObject {
    return {
      Authorization: this.token ? `Bearer ${this.token}` : undefined,
    }
  }

  get apiClient(): AxiosInstance {
    return axios.create({
      baseURL: API_URL,
      headers: this.headers,
    })
  }

  get graphqlClient(): GraphQLClient {
    return new GraphQLClient(API_URL, { headers: this.headers })
  }

  get api(): IApi {
    return createApi(this.useMocks, this.apiClient, this.graphqlClient)
  }

  @action toggleMockApi = (): void => {
    this.useMocks = !this.useMocks
  }
}
