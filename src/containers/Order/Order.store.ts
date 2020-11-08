import { makeAutoObservable, observable } from 'mobx'

import { Kit, OrderItem, PalletType } from '~/api/data'
import { UtilsStore } from '~/store/utils'
import { InputModel } from '~/components'

import { Step, StepHint } from './constants'

import { OrderModel } from './Order.model'
import { ScannedPaletteModel } from './ScannedPalette.model'
import { ScannedItemModel } from './ScannedItem.model'
import { validatePalleteNoStep } from './utils'

export class OrderStore {
  // ====================================================
  // Model
  // ====================================================
  step = Step.PALETT_NO
  input = new InputModel()

  order?: OrderModel
  orderLoading = false
  orderLoaded = false

  palleteTypes: PalletType[]

  scannedPalettes = observable<ScannedPaletteModel>([])
  scannedItems = observable<ScannedItemModel>([])

  constructor(private utils: UtilsStore) {
    makeAutoObservable(this)
  }

  // ====================================================
  // Memoized views
  // ====================================================
  get orderItems(): OrderItem[] {
    return this.order?.orderItems ?? []
  }

  get kits(): Kit[] {
    return this.order?.kits ?? []
  }

  get scannedPallete(): ScannedPaletteModel | null {
    if (!this.scannedPalettes.length) return null
    return this.scannedPalettes[this.scannedPalettes.length - 1]
  }

  get barCodes(): string[] {
    return this.orderItems.map((item) => item.barcode)
  }

  get kitNumbers(): string[] {
    return this.kits.map((kit) => kit.kitNumber)
  }

  get stepHint(): string {
    return StepHint[this.step]
  }

  get stepError(): string {
    if (!this.input.value) {
      return ''
    }

    switch (this.step) {
      case 'PALETT_NO':
        return validatePalleteNoStep(
          this.input.value,
          this.barCodes,
          this.kitNumbers,
          this.orderItems,
          this.palleteTypes,
          this.scannedPalettes
        )

      // case 'PALETT_TYPE':
      //   return validatePalleteTypeStep(
      //     this.input.value,
      //     this.barCodes,
      //     this.kitNumbers,
      //     this.orderItems,
      //     this.palleteTypes,
      //     this.scannedPalettes
      //   )

      default:
        return ''
    }
  }

  get stepValid(): boolean {
    return Boolean(!this.stepError)
  }

  // ====================================================
  // API
  // ====================================================
  private getCommonData = async (): Promise<void> => {
    try {
      this.palleteTypes = await this.utils.api.getPalletTypes()
    } catch (e) {
      this.utils.notification.error(e)
    }
  }

  private getOrder = async (num: number): Promise<void> => {
    this.orderLoading = true

    try {
      const order = await this.utils.api.getOrder(num)
      this.order = new OrderModel(order)
      this.orderLoaded = true
    } catch (e) {
      this.utils.notification.error(e)
    } finally {
      this.orderLoading = false
    }
  }

  // ====================================================
  // Actions
  // ====================================================
  submit = (): void => {
    switch (this.step) {
      case 'PALETT_NO': {
        this.createPallete(this.input.pop())
        this.setStep(Step.PALETT_TYPE)
        break
      }

      case 'PALETT_TYPE': {
        this.setPalleteType(this.input.pop())
        this.setStep(Step.ITEM_OR_KIT_NO)
        break
      }

      case 'ITEM_OR_KIT_NO': {
        this.setPalleteType(this.input.pop())
        this.setStep(Step.ITEM_OR_KIT_NO)
        break
      }

      default:
        break
    }
  }

  setStep = (step: Step): void => {
    this.step = step
  }

  setPalleteType = (type: string): void => {
    if (!this.scannedPallete) return
    this.scannedPallete.setType(type)
  }

  createPallete = (paletteNo: string): void => {
    this.scannedPalettes.push(new ScannedPaletteModel({ paletteNo }))
  }

  mountPage = (): void => {
    this.getCommonData()
    this.getOrder(123)
  }
}
