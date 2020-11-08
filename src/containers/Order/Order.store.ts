import { makeAutoObservable, observable } from 'mobx'

import { Kit, Order, OrderItem, PalletType } from '~/api/data'
import { UtilsStore } from '~/store/utils'
import { InputModel } from '~/components'

import { Step, StepHint } from './constants'

import { ScannedPaletteModel, ScannedItemModel, ScannedKitModel } from './models'
import { validatePalleteNoStep } from './utils'

export class OrderStore {
  // ====================================================
  // Model
  // ====================================================
  // The order that's being processed
  orderNoInput = new InputModel()
  order?: Order
  orderLoading = false
  orderLoaded = false

  // Static data from the server
  palleteTypes: PalletType[] = []

  // Wizard controls
  step = Step.PALETT_NO
  input = new InputModel()
  scanning = false
  correction = false

  // Wizard progress
  scannedPalettes = observable<ScannedPaletteModel>([])
  scannedItems = observable<ScannedItemModel>([])
  scannedKit: ScannedKitModel

  constructor(private utils: UtilsStore) {
    makeAutoObservable(this)
  }

  // ====================================================
  // Memoized views
  // ====================================================
  get isPlantronics(): boolean {
    return Boolean(this.order?.client === 'Plantronics')
  }

  get barCodes(): string[] {
    return this.orderItems.map((item) => item.barcode)
  }

  get orderItems(): OrderItem[] {
    return this.order?.orderItems ?? []
  }

  get kits(): Kit[] {
    return this.order?.kits ?? []
  }

  get kitNumbers(): string[] {
    return this.kits.map((kit) => kit.kitNumber)
  }

  get matchingKit(): Kit | undefined {
    return this.kits.find((kit) => kit.kitNumber === this.input.value)
  }

  get scannedPallete(): ScannedPaletteModel | null {
    if (!this.scannedPalettes.length) return null

    return this.scannedPalettes[this.scannedPalettes.length - 1]
  }

  // -----------------------------------
  // Wizard
  // -----------------------------------
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
  // Setters
  // ====================================================
  setStep = (step: Step): void => {
    this.step = step
  }

  setPalleteNo = (paletteNo: string): void => {
    this.scannedPalettes.push(new ScannedPaletteModel({ paletteNo }))
  }

  setPalleteType = (type: string): void => {
    if (!this.scannedPallete) return
    this.scannedPallete.setType(type)
  }

  setKit = (kit: Kit): void => {
    console.log('set kit', kit)
    // const orderItems = kit.items.map((item) => this.o)
    // this.scannedKit = new ScannedKitModel(kit)
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

  private getOrder = async (num: string): Promise<void> => {
    this.orderLoading = true

    try {
      this.order = await this.utils.api.getOrder(num)
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
      case 'ORDER_NO': {
        this.getOrder(this.input.pop())
        this.setStep(Step.PALETT_NO)
        break
      }

      case 'PALETT_NO': {
        this.setPalleteNo(this.input.pop())
        this.setStep(Step.PALETT_TYPE)
        break
      }

      case 'PALETT_TYPE': {
        this.setPalleteType(this.input.pop())
        this.setStep(Step.ITEM_OR_KIT_NO)
        break
      }

      case 'ITEM_OR_KIT_NO': {
        const num = this.input.pop()

        if (this.matchingKit) {
          this.setKit(this.matchingKit)
        } else {
          console.log('do something with item no', num)
        }

        this.setPalleteType(this.input.pop())
        this.setStep(Step.ITEM_OR_KIT_NO)
        break
      }

      default:
        break
    }
  }

  mountPage = (): void => {
    this.getCommonData()
  }
}
