import express from 'express'
import cookieParser from 'cookie-parser'
import { render } from '@jaredpalmer/after'
import { renderToString } from 'react-dom/server'
import routes from './routes'
import MyDocument from './Document'
import { renderStylesToString } from 'emotion-server'
import { SECRET } from './cookies'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(cookieParser(SECRET))
  .get('/*', async (req, res) => {
    //res.cookie('me', { firstName: 'paul', lastName: 'craig' })

    // Cookies that have not been signed
    console.log('Regular Cookies')
    console.log(req.cookies)
    console.log('///')

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
      res.send(html)
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  })

export default server
