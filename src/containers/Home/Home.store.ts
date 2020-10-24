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
    this.factsFetching = true

    try {
      this.facts = await this.utils.api.getFacts(5)
      this.factsFetched = true
    } catch (error) {
      this.utils.notification.error(error)
      this.utils.logger.error(error)
    } finally {
      this.factsFetching = false
    }
  }

  @action mountPage = (): void => {
    if (!this.factsFetched) {
      this.fetchFacts()
    }
  }
}
