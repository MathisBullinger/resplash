import { useLocation } from 'react-router-dom'

export function usePageIndex() {
  const location = useLocation()
  return /\/favorites(\/|$)/.test(location.pathname) ? 1 : 0
}

const pages = ['home', 'favorites'] as const
export const usePage = () => pages[usePageIndex()]
