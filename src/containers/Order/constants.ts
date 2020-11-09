export enum Step {
  ORDER_NO = 'ORDER_NO',
  PALETT_NO = 'PALETT_NO',
  PALETT_TYPE = 'PALETT_TYPE',
  ITEM_OR_KIT = 'ITEM_OR_KIT',
  NEXT_ITEM_OR_KIT = 'NEXT_ITEM_OR_KIT',
  KIT_ITEM = 'KIT_ITEM',
  NEXT_KIT_ITEM = 'NEXT_KIT_ITEM',
  QUANTITY = 'QUANTITY',
  SERIAL_NUMBERS = 'SERIAL_NUMBERS',
  FINISHED = 'FINISHED',
}

// prettier-ignore
export const StepHint: { [key in Step]: string } = {
  ORDER_NO: 'Načtěte číslo objednávky',
  PALETT_NO: 'Naskenujte logistickou jednotku',
  PALETT_TYPE: 'Naskenujte typ logistické jednotky',
  ITEM_OR_KIT: 'Naskenujte položku objednávky (ItemNo/EAN) nebo číslo kitu',
  NEXT_ITEM_OR_KIT: 'Naskenujte další položku (ItemNo nebo EAN), další číslo kitu (KIT Item) nebo ukončete paletu',
  KIT_ITEM: 'Naskenujte položku kitu (ItemNo/EAN)',
  NEXT_KIT_ITEM: 'Naskenujte další položku (ItemNo/EAN) v krabici kitu',
  QUANTITY: 'Naskenujte množství položky',
  SERIAL_NUMBERS: 'Naskenujte seriová čísla',
  FINISHED: 'Objednávka je zkontrolována a potvrzena.',
}
