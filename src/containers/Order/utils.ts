import { Kit, OrderItem, PalletType } from '~/api/data'

import { OrderItemModel, ScannedKitModel, ScannedPaletteModel } from './models'

// TODO: is this correct?
export const isMatch = (a: string, b: string): boolean => a?.toUpperCase() === b?.toUpperCase()

export const isKitNo = (num: string | number, kitNumbers: string[]): boolean =>
  kitNumbers.includes(String(num).toUpperCase())

export const findKit = (kits: Kit[], kitNumber: string): Kit | undefined =>
  kits.find((kit) => kit.kitNumber === kitNumber)

export const findItem = (
  items: OrderItemModel[],
  code: string,
  kit?: ScannedKitModel
): OrderItemModel[] =>
  items
    .filter((item) => !item.scanningDone)
    .filter((item) => {
      const matches = {
        number: isMatch(item.itemNumber, code),
        barcode: isMatch(item.barcode, code),
        scannedKitNumber: kit ? kit.kitNumber === item.kitNumber : true,
      }

      return (matches.number || matches.barcode) && matches.scannedKitNumber
    })

export const findPalleteType = (types: PalletType[], value: string): PalletType | undefined =>
  types.find((t) => t.name === value)

export const validatePalleteNo = (
  code: string,
  barCodes: string[],
  kitNumbers: string[],
  orderItems: OrderItem[],
  palleteTypes: PalletType[],
  scannedPalettes: ScannedPaletteModel[]
): string => {
  if (scannedPalettes.some((pallete) => pallete.paletteNo.toUpperCase() === code)) {
    return `Paleta č. "${code}" je již naskenována.`
  }

  if (barCodes.some((barcode) => isMatch(barcode, code))) {
    return `Číslo palety nemůže být stejné jako barcode položky z objednávky.`
  }

  if (kitNumbers.some((num) => isMatch(num, code))) {
    return `Číslo palety nemůže být stejné jako číslo kitu z objednávky.`
  }

  if (orderItems.some((item) => isMatch(item.itemNumber, code))) {
    return `Číslo palety nemůže být stejné jako itemNumber položky z objednávky.`
  }

  if (palleteTypes.some((type) => isMatch(type.name, code))) {
    return `Číslo palety nemůže být stejné jako typ palety..`
  }

  return ''
}

export const validatePalleteType = (inputValue: string, palleteTypes: PalletType[]): string => {
  const value = inputValue.toUpperCase()

  if (!palleteTypes.find((type) => type.name.toUpperCase() === value)) {
    const names = palleteTypes.map((t) => t.name).join(', ')

    return `Typ palety "${inputValue}" nenalezen v číselníku [${names}]`
  }

  return ''
}

export const validateItemOrKit = (
  inputValue: string,
  orderItems: OrderItemModel[],
  kits: Kit[],
  scannedKit?: ScannedKitModel
): string => {
  const value = inputValue.toUpperCase()

  const [item] = findItem(orderItems, value)
  const kit = findKit(kits, value)

  if (!item && !kit) {
    return 'No such item or kit in order'
  }

  if (!scannedKit && item?.isKit) {
    return 'This item is for kit only'
  }

  return ''
}

export const validateKitItem = (code: string, scannedKit?: ScannedKitModel): string => {
  if (!scannedKit) {
    return 'FATAL ERROR'
  }

  const [item] = findItem(scannedKit.orderItems, code, scannedKit)
  if (!item) {
    return 'No such item in kit'
  }

  return ''
}
