import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from '~/store'

import { HomePage } from './Home.page'

it('renders without crashing', () => {
  createStore()

  // for now...
  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: jest.fn(() => Promise.resolve([])),
    } as any)
  )

  const div = document.createElement('div')
  ReactDOM.render(<HomePage />, div)
  ReactDOM.unmountComponentAtNode(div)
})
