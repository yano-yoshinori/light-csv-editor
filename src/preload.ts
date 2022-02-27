const { contextBridge } = require('electron')
const fs = require('fs')

// TODO 自動 BOM 消去
// TODO convert sjis -> utf-8
contextBridge.exposeInMainWorld('openFile', (fileName: string) => {
  const file = fs.readFileSync(`./${fileName}`, { encoding: 'utf-8' })
  return file
})

contextBridge.exposeInMainWorld('writeFile', (fileName: string, content: string) => {
  fs.writeFileSync(`./${fileName}`, content)
})
