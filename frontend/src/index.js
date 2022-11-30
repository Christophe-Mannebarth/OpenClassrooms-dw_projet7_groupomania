import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from './_store'
import { App } from './App'
import './index.css'

/* It's importing the bootstrap css file. */
import 'bootstrap/dist/css/bootstrap.min.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  // StrictMode is a tool for highlighting potential problems in an application,
  // So it is better to activate it during the development period.
  // As it simulate unmounting and remounting the component in development mode,
  // it make React Components rendered twice.
  // You can deactivate it once the development is completed to avoid the double rendering.
  //
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
)
