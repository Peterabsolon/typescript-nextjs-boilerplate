import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { Button, Heading, Table, Input, Text } from '~/components'
import { useStore } from '~/store'

import { OrderItemModel } from './OrderItem.model'
import { ScannedPaletteModel } from './ScannedPalette.model'
import { Kit, PalletType } from '~/api/data'

export const OrderPage: FC = observer(() => {
  const {
    input,
    mountPage,
    order,
    palleteTypes,
    scannedPalettes,
    stepError,
    stepHint,
    stepValid,
    submit,
  } = useStore().pages.OrderStore

  useEffect(mountPage, [])

  if (!order) {
    return null
  }

  return (
    <>
      <Heading>Položky objednávky</Heading>
      <Table<OrderItemModel>
        rows={order.orderItems}
        cols={[
          { key: 'itemNumber', label: 'Item No' },
          { key: 'name2', label: 'Name' },
          { key: 'description', label: 'Description' },
          { key: 'buentId', label: 'Buent ID' },
          { key: 'barcode', label: 'Barcode', badge: 'ks' },
        ]}
      />

      <Heading>Kity objednávky</Heading>
      <Table<Kit>
        rows={order.kits.map((kit) => ({ ...kit, id: kit.kitNumber }))}
        cols={[
          { key: 'kitNumber', label: 'Kit No' },
          { key: 'kitQuantity', label: 'Qty' },
        ]}
      />

      <Heading mt={3}>Typ paliet</Heading>
      <Table<PalletType> rows={palleteTypes} cols={[{ key: 'name', label: 'Name' }]} />

      <Heading mt={3}>Naskenované palety</Heading>
      <Table<ScannedPaletteModel>
        rows={scannedPalettes}
        cols={[{ key: 'paletteNo', label: 'Pallet No' }]}
      />

      <Text mt={3}>{stepHint}</Text>

      <Button variant="primary" disabled={!stepValid || !input.value} onClick={submit} mt={1}>
        Submit
      </Button>

      <div>
        <Input model={input} />
      </div>

      <Text>{stepError}</Text>
    </>
  )
})
