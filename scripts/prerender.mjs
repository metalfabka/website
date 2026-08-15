import { createServer } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

async function main() {
  // Use Vite's own dev-mode module transformer purely as a way to load and
  // run entry-server.jsx (JSX, npm imports, etc.) inside Node — no actual
  // server gets exposed, and this never touches a browser.
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
  const appHtml = render()

  await vite.close()

  const distIndexPath = path.resolve('dist/index.html')
  let template = fs.readFileSync(distIndexPath, 'utf-8')

  template = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  )

  fs.writeFileSync(distIndexPath, template)
  console.log('Prerendered markup injected into dist/index.html')
}

main()
