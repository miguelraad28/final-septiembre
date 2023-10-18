import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'

const fileName = fileURLToPath(import.meta.url)
const configDirname = path.dirname(fileName)

const rootDirectory = path.resolve(configDirname, '../')

export { configDirname, rootDirectory }

export const isMainModule =
  path.resolve(process.argv[1]) === path.resolve(`${rootDirectory}/app.js`)

export const ensureDirExists = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}
