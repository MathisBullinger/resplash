import { configureStore } from '@reduxjs/toolkit'
import photos from './photos'

export default configureStore({ reducer: photos })
