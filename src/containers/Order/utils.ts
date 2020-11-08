import { OrderItem, PalletType } from '~/api/data'

import { ScannedPaletteModel } from './models'

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

export const validatePalleteTypeStep = (inputValue: string): string => {
  const value = inputValue.toUpperCase()

  console.log('value', value)

  return ''
}

export const isKitNo = (num: string | number, kitNumbers: string[]): boolean =>
  kitNumbers.includes(String(num).toUpperCase())
