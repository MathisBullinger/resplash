import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, render as rtlRender } from '@testing-library/react'
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'

export * from '@testing-library/react'

const mockStore = () => {
  const photos = createSlice({
    name: 'photos',
    initialState: { byId: {}, favorites: [], gallery: [] },
    reducers: {},
  }).reducer
  return configureStore({ reducer: { photos } })
}

const Providers: React.FC = ({ children }) => (
  <ReduxProvider store={mockStore()}>
    <MemoryRouter>{children}</MemoryRouter>
  </ReduxProvider>
)

export const render = (...[comp, opts]: Parameters<typeof rtlRender>) => {
  cleanup()
  return rtlRender(comp, { wrapper: Providers, ...opts })
}
