import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Kit } from '~/api/data'
import { Button, Heading, Table, Text, Flex, Box, Form } from '~/components'
import { useStore } from '~/store'

import { OrderItemModel, ScannedItemModel, ScannedPaletteModel } from './models'
import { Header } from './components'

const Controls = styled.div``

const ScanningForm = styled.div``

export const OrderPage: FC = observer(() => {
  const {
    canConfirmOrder,
    canFinishPackage,
    canFinishPallete,
    canScanCode,
    canStartScanning,
    input,
    kits,
    loginForm,
    matchingKitOrderItems,
    matchingOrderItems,
    mountPage,
    onConfirm,
    onFinishPackage,
    onFinishPallete,
    onStartScanning,
    orderItems,
    palleteForm,
    scannedItems,
    scannedKit,
    scannedPalettes,
    stepError,
    stepHint,
    unmountPage,
  } = useStore().pages.OrderStore

  console.log('matchingKitOrderItems', matchingKitOrderItems)

  useEffect(() => {
    mountPage()
    return unmountPage
  }, [])

  return (
    <>
      <Header />

      <Form model={palleteForm} />

      <Form model={loginForm} />

      <Flex justifyContent="space-between">
        <Box width="33%">
          {scannedKit && (
            <>
              <Heading mt={3}>Naskenovaný kit ({scannedKit.kitNumber})</Heading>
              <Table<OrderItemModel>
                rows={scannedKit.orderItems}
                rowHighlighted={(row) => matchingKitOrderItems.includes(row)}
                cols={[
                  { key: 'itemNumber', label: 'Item No' },
                  { key: 'description', label: 'Description' },
                  { key: 'quantity', label: 'Qty' },
                  { key: 'scanned', label: 'Scanned' },
                  {
                    key: 'remaining',
                    label: 'Remain',
                    render: (row) => -row.remaining,
                    highlighted: (row) => !row.scanningDone,
                  },
                ]}
              />
            </>
          )}

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
          <Heading mt={3}>Naskenované palety ({scannedPalettes.length})</Heading>
          <Table<ScannedPaletteModel>
            rows={scannedPalettes}
            cols={[{ key: 'paletteNo', label: 'Pallet No' }]}
          />

          <Heading>Položky objednávky ({orderItems.length})</Heading>
          <Table<OrderItemModel>
            rows={orderItems}
            rowHighlighted={(row) => !scannedKit && matchingOrderItems.includes(row)}
            cols={[
              { key: 'itemNumber', label: 'Item No' },
              { key: 'barcode', label: 'Barcode' },
              { key: 'kitNumber', label: 'Kit Number' },
              { key: 'quantity', label: 'Qty' },
              { key: 'unit', label: 'Unit' },
              { key: 'scanned', label: 'Scanned' },
              {
                key: 'remaining',
                label: 'Remain',
                render: (row) => -row.remaining,
                highlighted: (row) => !row.scanningDone,
              },
              { key: 'name2', label: 'Name' },
              { key: 'description', label: 'Description' },
            ]}
          />

          <div style={{ opacity: 0.5 }}>
            <Heading>Kity objednávky</Heading>
            <Table<Kit>
              rows={kits.map((kit) => ({ ...kit, id: kit.kitNumber }))}
              cols={[
                { key: 'kitNumber', label: 'Kit No' },
                { key: 'kitQuantity', label: 'Qty' },
              ]}
            />
          </div>
        </Box>
      </Flex>

      <Controls>
        <Button variant="primary" disabled={!canStartScanning} onClick={onStartScanning} mr={1}>
          Start
        </Button>

        <Button variant="primary" disabled={!canFinishPallete} onClick={onFinishPallete} mr={1}>
          Finish pallete
        </Button>

        <Button variant="primary" disabled={!canFinishPackage} onClick={onFinishPackage} mr={1}>
          Finish package
        </Button>

        <Button variant="primary" disabled={!canConfirmOrder} onClick={onConfirm} mr={1}>
          Confirm
        </Button>
      </Controls>

      <ScanningForm>
        <Text mt={3}>{stepHint}</Text>

        {canScanCode && <div>{input.jsx}</div>}

        {stepError}
      </ScanningForm>
    </>
  )
})
