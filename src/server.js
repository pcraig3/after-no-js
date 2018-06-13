import express from 'express'
import { render } from '@jaredpalmer/after'
import { renderToString } from 'react-dom/server'
import routes from './routes'
import MyDocument from './Document'
import { renderStylesToString } from 'emotion-server'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const customRenderer = node => ({
      html: renderStylesToString(renderToString(node)),
    })

    try {
      const html = await render({
        req,
        res,
        customRenderer,
        routes,
        assets,
        customThing: 'this is a thing',
        document: MyDocument,
      })
      res.send(html)
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  })

export default server
