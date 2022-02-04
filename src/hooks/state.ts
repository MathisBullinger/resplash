import type store from 'state/store'
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector,
} from 'react-redux'

export const useDispatch = () => useReduxDispatch<typeof store.dispatch>()

export const useAppState: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
