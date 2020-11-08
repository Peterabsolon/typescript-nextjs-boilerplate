export enum Step {
  ORDER_NO = 'ORDER_NO',
  PALETT_NO = 'PALETT_NO',
  PALETT_TYPE = 'PALETT_TYPE',
  ITEM_OR_KIT_NO = 'ITEM_OR_KIT_NO',
  // QUANTITY = 'QUANTITY',
  // SERIAL_NUMBERS = 'SERIAL_NUMBERS',
}

export const StepHint: { [key in Step]: string } = {
  ORDER_NO: 'Načtěte číslo objednávky',
  PALETT_NO: 'Naskenujte logistickou jednotku',
  PALETT_TYPE: 'Naskenujte typ logistické jednotky',
  ITEM_OR_KIT_NO: 'Naskenujte položku objednávky (ItemNo/EAN) nebo číslo kitu',
}
