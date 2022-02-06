import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { cleanup, render as rtlRender } from '@testing-library/react'

export * from '@testing-library/react'

const Providers: React.FC = ({ children }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

export const render = (...[comp, opts]: Parameters<typeof rtlRender>) => {
  cleanup()
  return rtlRender(comp, { wrapper: Providers, ...opts })
}
