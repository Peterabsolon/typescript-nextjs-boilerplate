import { autorun, makeAutoObservable, observable } from 'mobx'

import { Kit, Order, PalletType } from '~/api/data'
import { UtilsStore } from '~/store/utils'
import { InputModel, FormModel } from '~/components'

import { Step, StepHint } from './constants'

import { ScannedPaletteModel, ScannedItemModel, ScannedKitModel, OrderItemModel } from './models'
import {
  findKit,
  findItem,
  validatePalleteNo,
  findPalleteType,
  validatePalleteType,
  validateItemOrKit,
  validateKitItem,
} from './utils'

interface PalleteFormValues {
  name: string
}

interface LoginFormValues {
  username: string
  password: string
}

export class OrderStore {
  // ====================================================
  // Model
  // ====================================================

  // -----------------------------------
  // Order
  // -----------------------------------
  orderNumberInput = new InputModel()

  order?: Omit<Order, 'orderItems'>
  orderItems = observable<OrderItemModel>([])

  orderLoading = false
  orderLoaded = false

  // -----------------------------------
  // Enums
  // -----------------------------------
  palleteTypes: PalletType[] = []

  // -----------------------------------
  // Wizard state
  // -----------------------------------
  step = Step.ORDER_NO
  input = new InputModel()
  scanning = false
  correction = false

  // -----------------------------------
  // Scanned objects
  // -----------------------------------
  scannedKit?: ScannedKitModel
  scannedItems = observable<ScannedItemModel>([])
  scannedPalettes = observable<ScannedPaletteModel>([])

  // -----------------------------------
  // Login form
  // -----------------------------------
  loginForm = new FormModel<LoginFormValues>({
    fields: [
      new InputModel({
        name: 'username',
        label: 'Username',
        validate: (value) => (value.length < 3 ? 'Atleast 3...' : undefined),
      }),

      new InputModel({
        name: 'password',
        label: 'Password',
        validate: (value) => (value.length < 3 ? 'Atleast 3...' : undefined),
      }),
    ],

    onSubmit: async (values) => {
      try {
        const token = await this.utils.api.loginAdmin(values)
        this.utils.auth.setToken(token)
      } catch (e) {
        this.utils.notification.error('Invalid credentials')
        throw e
      }
    },
  })

  // -----------------------------------
  // Finish pallete form
  // -----------------------------------
  palleteForm = new FormModel<PalleteFormValues>({
    fields: [
      new InputModel({
        name: 'foo',
        label: 'Foo',
        validate: (value) => (value.length < 3 ? 'Atleast 3...' : undefined),
      }),

      new InputModel({
        name: 'bar',
        label: 'Bar',
        validate: (value) => (value.length < 3 ? 'Atleast 3...' : undefined),
      }),
    ],

    onSubmit: (values) => {
      return Promise.resolve(console.log('pallete values', values))
    },
  })

  constructor(private utils: UtilsStore) {
    makeAutoObservable(this)

    autorun(() => {
      if (this.input.value && this.step === 'QUANTITY' && this.scannedItem) {
        this.scannedItem.setTempQuantity(Number(this.input.value))
      }
    })

    autorun(() => {
      if (this.scannedKit?.scanningDone) {
        this.setStep(Step.KIT_DONE)
      }
    })
  }

  // ====================================================
  // Memoized views
  // ====================================================

  // -----------------------------------
  // Order data getters
  // -----------------------------------
  get isPlantronics(): boolean {
    return Boolean(this.order?.client === 'Plantronics')
  }

  get barCodes(): string[] {
    return this.orderItems.map((item) => item.barcode)
  }

  get kits(): Kit[] {
    return this.order?.kits ?? []
  }

  get kitNumbers(): string[] {
    return this.kits.map((kit) => kit.kitNumber)
  }

  get matchingOrderItems(): OrderItemModel[] {
    return findItem(this.orderItems, this.input.value, this.scannedKit)
  }

  get matchingKitOrderItems(): OrderItemModel[] {
    if (!this.scannedKit) return []
    return findItem(this.scannedKit.orderItems, this.input.value, this.scannedKit)
  }

  get matchingOrderItem(): OrderItemModel | undefined {
    return this.matchingOrderItems[0]
  }

  get isValid(): boolean {
    const orderValid = this.orderItems.every((item) => item.isTempRemainingValid)
    const kitValid = this.scannedKit?.orderItems.every((item) => item.isTempRemainingValid) ?? true
    return orderValid && kitValid
  }

  // -----------------------------------
  // Scanned data getters
  // -----------------------------------
  get scannedPallete(): ScannedPaletteModel | undefined {
    if (!this.scannedPalettes.length) return undefined
    return this.scannedPalettes[this.scannedPalettes.length - 1]
  }

  get hasScannedItems(): boolean {
    return Boolean(this.scannedItems.length)
  }

  get scannedItem(): ScannedItemModel | undefined {
    if (!this.hasScannedItems) return undefined

    const item = this.scannedItems[this.scannedItems.length - 1]

    return item.saved ? undefined : item
  }

  // -----------------------------------
  // Flow logic
  // -----------------------------------
  get canStartScanning(): boolean {
    return Boolean(this.order) && !this.scanning && !this.hasScannedItems
  }

  get canConfirmOrder(): boolean {
    return Boolean(this.scannedItems.length) && this.orderItems.every((item) => item.scanningDone)
  }

  get canCorrectOrder(): boolean {
    return this.hasScannedItems
  }

  get canFinishPallete(): boolean {
    return this.hasScannedItems
  }

  get canScanCode(): boolean {
    return this.step !== 'ORDER_NO' && this.step !== 'KIT_DONE' && this.scanning
  }

  get canFinishPackage(): boolean {
    return this.step === 'KIT_DONE'
  }

  get stepHint(): string {
    if (this.order && !this.scanning) {
      return 'Objednávka načtena, zahajte skenování'
    }

    return StepHint[this.step]
  }

  get stepError(): string {
    if (this.input.pristine) {
      return ''
    }

    switch (this.step) {
      case 'PALETT_NO':
        return validatePalleteNo(
          this.input.value,
          this.barCodes,
          this.kitNumbers,
          this.orderItems,
          this.palleteTypes,
          this.scannedPalettes
        )

      case 'PALETT_TYPE':
        return validatePalleteType(this.input.value, this.palleteTypes)

      case 'ITEM_OR_KIT':
      case 'NEXT_ITEM_OR_KIT':
        return validateItemOrKit(this.input.value, this.orderItems, this.kits, this.scannedKit)

      case 'KIT_ITEM':
      case 'NEXT_KIT_ITEM':
        return validateKitItem(this.input.value, this.scannedKit)

      case 'QUANTITY':
        return this.isValid ? '' : 'Too many'

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

  setPalleteType = (type: PalletType): void => {
    if (this.scannedPallete) {
      this.scannedPallete.setType(type)
    }
  }

  setKit = (kit: Kit): void => {
    this.scannedKit = new ScannedKitModel(kit, this.scannedItems)
  }

  addPallete = (paletteNo: string): void => {
    this.scannedPalettes.push(new ScannedPaletteModel({ paletteNo }))
  }

  addItem = (data: OrderItemModel): void => {
    if (this.scannedPallete) {
      const item = new ScannedItemModel({
        ...data,
        quantity: 0,
        palletNo: this.scannedPallete.paletteNo,
      })

      this.scannedItems.push(item)
    }
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
    this.order = undefined
    this.orderItems.clear()
    this.orderLoading = true

    try {
      const order = await this.utils.api.getOrder(num)

      this.order = order
      order.orderItems.forEach((item) => {
        this.orderItems.push(new OrderItemModel(item, this.scannedItems))
      })

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
  loadOrder = (): void => {
    const orderNumber = this.orderNumberInput.value
    if (orderNumber) {
      this.getOrder(orderNumber)
      this.setStep(Step.PALETT_NO)
    }
  }

  submitStep = (): void => {
    if (this.stepError) {
      this.utils.notification.error(this.stepError)
      this.input.clear()
      return
    }

    const value = this.input.pop()

    switch (this.step) {
      case 'ORDER_NO': {
        this.loadOrder()
        break
      }

      case 'PALETT_NO': {
        this.addPallete(value)
        this.setStep(Step.PALETT_TYPE)
        break
      }

      case 'PALETT_TYPE': {
        const type = findPalleteType(this.palleteTypes, value)
        if (type) {
          this.setPalleteType(type)
          this.setStep(Step.ITEM_OR_KIT)
        }
        break
      }

      case 'ITEM_OR_KIT':
      case 'NEXT_ITEM_OR_KIT': {
        // HANDLE ADDING ONE BY ONE

        const kit = findKit(this.kits, value)
        if (kit) {
          this.setKit(kit)
          this.setStep(Step.KIT_ITEM)
          break
        }

        if (this.matchingOrderItem) {
          const step = this.matchingOrderItem.scanSerialNumbers
            ? Step.SERIAL_NUMBERS
            : Step.QUANTITY

          this.addItem(this.matchingOrderItem)
          this.setStep(step)
        }
        break
      }

      case 'KIT_ITEM':
      case 'NEXT_KIT_ITEM': {
        if (this.scannedKit) {
          const [item] = findItem(this.scannedKit.orderItems, value, this.scannedKit)

          if (item) {
            this.addItem(item)
            this.setStep(item.scanSerialNumbers ? Step.SERIAL_NUMBERS : Step.QUANTITY)
          }
        }

        // is part of a kit

        break
      }

      case 'QUANTITY': {
        if (this.scannedItem) {
          this.scannedItem.save()
          this.setStep(this.scannedKit ? Step.NEXT_KIT_ITEM : Step.NEXT_ITEM_OR_KIT)
        }
        break
      }

      case 'SERIAL_NUMBERS': {
        // is for kit?
        // is 2D?
        break
      }

      default:
        break
    }
  }

  onKeyUp = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.submitStep()
    }
  }

  onConfirm = (): void => {
    this.palleteForm.open()
  }

  onFinishPackage = (): void => {
    alert('finish package...')
  }

  onFinishPallete = (): void => {
    alert('finish pallete...')
  }

  onStartScanning = (): void => {
    this.scanning = true
  }

  // ====================================================
  // Lifecycle
  // ====================================================
  mountPage = (): void => {
    document.addEventListener('keyup', this.onKeyUp)
    this.getCommonData()
  }

  unmountPage = (): void => {
    document.removeEventListener('keyup', this.onKeyUp)
  }
}
