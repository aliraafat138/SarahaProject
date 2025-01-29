import express from 'express'
import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve('./src/config/.env.dev') })
import bootStrap from './src/app.controller.js'
const app = express()
const port = process.env.PORT

bootStrap(app, express)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))