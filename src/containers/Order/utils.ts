import { Kit, OrderItem, PalletType } from '~/api/data'

import { OrderItemModel, ScannedKitModel, ScannedPaletteModel } from './models'

export const isKitNo = (num: string | number, kitNumbers: string[]): boolean =>
  kitNumbers.includes(String(num).toUpperCase())

export const findKit = (kits: Kit[], kitNumber: string): Kit | undefined =>
  kits.find((kit) => kit.kitNumber === kitNumber)

export const findItem = (items: OrderItemModel[], value: string): OrderItemModel | undefined =>
  items.find((item) => item.itemNumber === value || item.barcode === value)

// export const findItemInKit = (kit: ScannedKitModel[])

export const findPalleteType = (types: PalletType[], value: string): PalletType | undefined =>
  types.find((t) => t.name === value)

export const validatePalleteNoStep = (
  inputValue: string,
  barCodes: string[],
  kitNumbers: string[],
  orderItems: OrderItem[],
  palleteTypes: PalletType[],
  scannedPalettes: ScannedPaletteModel[]
): string => {
  const value = inputValue.toUpperCase()

  if (scannedPalettes.some((pallete) => pallete.paletteNo.toUpperCase() === value)) {
    return `Paleta č. "${value}" je již naskenována.`
  }

  if (barCodes.some((barcode) => barcode.toUpperCase() === value)) {
    return `Číslo palety nemůže být stejné jako barcode položky z objednávky.`
  }

  if (kitNumbers.some((num) => num.toUpperCase() === value)) {
    return `Číslo palety nemůže být stejné jako číslo kitu z objednávky.`
  }

  if (orderItems.some((item) => item.itemNumber.toUpperCase() === value)) {
    return `Číslo palety nemůže být stejné jako itemNumber položky z objednávky.`
  }

  if (palleteTypes.some((type) => type.name.toUpperCase() === value)) {
    return `Číslo palety nemůže být stejné jako typ palety..`
  }

  return ''
}

export const validatePalleteTypeStep = (inputValue: string, palleteTypes: PalletType[]): string => {
  const value = inputValue.toUpperCase()

  if (!palleteTypes.find((type) => type.name.toUpperCase() === value)) {
    const names = palleteTypes.map((t) => t.name).join(', ')

    return `Typ palety "${inputValue}" nenalezen v číselníku [${names}]`
  }

  return ''
}

export const validateItemOrKitStep = (
  inputValue: string,
  orderItems: OrderItemModel[],
  kits: Kit[],
  scannedKit?: ScannedKitModel
): string => {
  const value = inputValue.toUpperCase()

  const item = findItem(orderItems, value)
  const kit = findKit(kits, value)

  if (!item && !kit) {
    return 'No such item or kit in order'
  }

  if (!scannedKit && item?.isKit) {
    return 'This item is for kit only'
  }

  return ''
}
