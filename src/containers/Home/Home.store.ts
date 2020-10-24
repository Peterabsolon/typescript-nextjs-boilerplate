import { action, makeAutoObservable } from 'mobx'

import { Fact } from '~/api/models'
import { UtilsStore } from '~/store/utils'

export class HomeStore {
  // ====================================================
  // Model
  // ====================================================
  facts: Fact[] = []
  factsFetching = false
  factsFetched = false

  constructor(private utils: UtilsStore) {
    makeAutoObservable(this)
  }

  // ====================================================
  // Actions
  // ====================================================
  @action fetchFacts = async (): Promise<void> => {
    if (this.factsFetching) {
      return
    }

    this.factsFetching = true

    try {
      this.facts = await this.utils.api.getFacts(5)
      this.factsFetched = true
    } catch (error) {
      console.error(error)
    } finally {
      this.factsFetching = false
    }
  }

  @action onPageMount = (): void => {
    if (!this.factsFetched) {
      this.fetchFacts()
    }
  }
}
