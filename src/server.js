import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
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
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))
  .get('/clear', (req, res) => {
    res.clearCookie('store')
    return res.send('no more cookies 🍪')
  })
  .all('/*', async (req, res) => {
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
        document: MyDocument,
      })

      return res.locals.redirect
        ? res.redirect(res.locals.redirect)
        : res.send(html)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      res.json(error)
    }
  })

export default server
