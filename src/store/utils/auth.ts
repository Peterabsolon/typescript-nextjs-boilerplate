import { action, makeAutoObservable } from 'mobx'
import axios, { AxiosInstance } from 'axios'
import { GraphQLClient } from 'graphql-request'

import { API_URL } from '~/constants'

export class AuthStore {
  token?: string

  constructor() {
    makeAutoObservable(this)
  }

  get loggedIn(): boolean {
    return Boolean(this.token)
  }

  get headers(): IAnyObject {
    return {
      Authorization: this.token ? `Bearer ${this.token}` : undefined,
    }
  }

  get restClient(): AxiosInstance {
    return axios.create({
      baseURL: API_URL,
      headers: this.headers,
    })
  }

  get graphqlClient(): GraphQLClient {
    return new GraphQLClient(API_URL, { headers: this.headers })
  }

  @action login = (): Promise<void> => {
    this.token = '123'
    return Promise.resolve()
  }

  @action logout = (): Promise<void> => {
    this.token = undefined
    return Promise.resolve()
  }
}
