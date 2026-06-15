import { createStore, applyMiddleware } from 'redux'
import { thunk, ThunkDispatch, ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

import rootReducer from './reducers'
import type { TCategories } from '../types'

type RootState = TCategories
type AppAction = { type: string; payload?: unknown; category?: string }

export type AppDispatch = ThunkDispatch<RootState, undefined, AppAction>

const middleware: [ThunkMiddleware<RootState, AppAction>] = [thunk]

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export type { RootState }
