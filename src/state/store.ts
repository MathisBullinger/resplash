import { configureStore } from '@reduxjs/toolkit'
import photos from './photos'
import preferences from './preferences'

export default configureStore({ reducer: { photos, preferences } })
