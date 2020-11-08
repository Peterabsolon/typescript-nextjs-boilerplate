import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Kit, OrderItem, PalletType } from '~/api/data'
import { Button, Heading, Table, Input, Text } from '~/components'
import { useStore } from '~/store'

import { ScannedPaletteModel } from './models'

const Controls = styled.div``

const ScanningForm = styled.div``

export const OrderPage: FC = observer(() => {
  const {
    input,
    kits,
    mountPage,
    orderItems,
    palleteTypes,
    scannedPalettes,
    stepError,
    stepHint,
    stepValid,
    submit,
  } = useStore().pages.OrderStore

  useEffect(mountPage, [])

  return (
    <>
      <Heading>Položky objednávky</Heading>
      <Table<OrderItem>
        rows={orderItems}
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
        rows={kits.map((kit) => ({ ...kit, id: kit.kitNumber }))}
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

      <Controls>
        <Button variant="primary" disabled={!stepValid || !input.value} onClick={submit} mt={1}>
          Start
        </Button>

        <Button variant="primary" disabled={!stepValid || !input.value} onClick={submit} mt={1}>
          Submit
        </Button>
      </Controls>

      <ScanningForm>
        <Text mt={3}>{stepHint}</Text>

        <div>
          <Input model={input} />
        </div>

        <Text>{stepError}</Text>
      </ScanningForm>
    </>
  )
})
