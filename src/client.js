import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ensureReady, After } from '@jaredpalmer/after'
import withProvider from './withProvider'
import routes from './routes'

const App = withProvider(After)

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <App data={data} routes={routes} />
    </BrowserRouter>,
    document.getElementById('root'),
  ),
)

if (module.hot) {
  module.hot.accept()
}
