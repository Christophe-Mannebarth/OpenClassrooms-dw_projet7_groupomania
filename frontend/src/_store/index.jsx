import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from './auth.slice'
import { postsReducer } from './posts.slice'
import themeReducer from './theme.slice'

export * from './auth.slice'
export * from './posts.slice'
export * from './theme.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableStateInvariant: false,
      serializableCheck: false,
    }),
})
