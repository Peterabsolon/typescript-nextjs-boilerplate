import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Kit, PalletType } from '~/api/data'
import { Button, Heading, Table, Text, Flex, Box, Form } from '~/components'
import { useStore } from '~/store'

import { OrderItemModel, ScannedItemModel, ScannedPaletteModel } from './models'
import { Header } from './components'

const Controls = styled.div``

const ScanningForm = styled.div``

export const OrderPage: FC = observer(() => {
  const {
    canConfirm,
    canFinishPallete,
    canStart,
    input,
    inputVisible,
    kits,
    mountPage,
    onConfirm,
    onFinishPallete,
    onStartScanning,
    orderItems,
    palleteTypes,
    scannedItems,
    scannedPalettes,
    stepHint,
    unmountPage,
    palleteForm,
  } = useStore().pages.OrderStore

  useEffect(() => {
    mountPage()
    return unmountPage
  }, [])

  return (
    <>
      <Header />

      <Form model={palleteForm} />

      <Flex>
        <Box width="34%">
          {scannedItems.length > 0 && (
            <>
              <Heading mt={3}>Naskenované položky ({scannedItems.length})</Heading>
              <Table<ScannedItemModel>
                rows={scannedItems}
                cols={[
                  { key: 'palletNo', label: 'Pallet No' },
                  { key: 'itemNumber', label: 'Item No' },
                  { key: 'description', label: 'Description' },
                  { key: 'quantity', label: 'Qty' },
                  { key: 'customs', label: 'Customs' },
                ]}
              />
            </>
          )}
        </Box>

        <Box width="64%">
          <Heading mt={3}>Typ paliet</Heading>
          <Table<PalletType> rows={palleteTypes} cols={[{ key: 'name', label: 'Name' }]} />

          <Heading mt={3}>Naskenované palety ({scannedPalettes.length})</Heading>
          <Table<ScannedPaletteModel>
            rows={scannedPalettes}
            cols={[{ key: 'paletteNo', label: 'Pallet No' }]}
          />

          <Heading>Položky objednávky ({orderItems.length})</Heading>
          <Table<OrderItemModel>
            rows={orderItems}
            cols={[
              { key: 'itemNumber', label: 'Item No' },
              { key: 'barcode', label: 'Barcode' },
              { key: 'kitNumber', label: 'Kit Number' },
              { key: 'quantity', label: 'Qty' },
              { key: 'unit', label: 'Unit' },
              { key: 'scanned', label: 'Scanned' },
              { key: 'remaining', label: 'Remain', render: (row) => -row.remaining },
              { key: 'name2', label: 'Name' },
              { key: 'description', label: 'Description' },
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
        </Box>
      </Flex>

      <Controls>
        <Button variant="primary" disabled={!canStart} onClick={onStartScanning} mr={1}>
          Start
        </Button>

        <Button variant="primary" disabled={!canFinishPallete} onClick={onFinishPallete} mr={1}>
          Finish pallete
        </Button>

        <Button variant="primary" disabled={!canConfirm} onClick={onConfirm} mr={1}>
          Confirm
        </Button>
      </Controls>

      <ScanningForm>
        <Text mt={3}>{stepHint}</Text>

        {inputVisible && <div>{input.jsx}</div>}
      </ScanningForm>
    </>
  )
})
