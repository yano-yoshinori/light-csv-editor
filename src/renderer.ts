/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css'

console.log('👋 This message is being logged by "renderer.js", included via webpack')

declare global {
  interface Window {
    openFile: (fileName: string) => string
    writeFile: (fileName: string, content: string) => void
  }
}

let inputs: HTMLInputElement[] = []

function generateTable(lines: string[]): HTMLInputElement[] {
  const tbody = document.querySelector('tbody')

  const inputs: HTMLInputElement[] = []

  lines.forEach((line) => {
    const cells = line.split(',')
    const tr = document.createElement('tr')
    tbody.append(tr)

    cells.forEach((cell) => {
      const td = document.createElement('td')
      const input = document.createElement('input')
      input.type = 'text'
      input.size = 6
      input.value = cell
      inputs.push(input)
      td.append(input)
      tr.append(td)
    })
  })

  return inputs
}

const fileNameinput = document.querySelector('input[name=file-name]') as HTMLInputElement
fileNameinput.value = 'sample.csv'

const openBtn = document.querySelector('button.open')
openBtn.addEventListener('click', () => {
  const csv = window.openFile(fileNameinput.value)
  const lines = csv.split('\r\n')
  inputs = generateTable(lines)
})

const saveBtn = document.querySelector('button.save')
saveBtn.addEventListener('click', () => {
  const cells = inputs.map((input) => input.value)
  window.writeFile(fileNameinput.value, cells.join(','))
})
