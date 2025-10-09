import { randomBytes } from 'crypto'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (htmlContext, { event }) => {
    // 生成高熵 nonce
    const nonce = randomBytes(16).toString('base64').replace(/\+/g, '-')      // 替換 +
    .replace(/\//g, '_')      // 替換 /
    .replace(/=+$/, '')       // 去掉尾部 =

    event.context.cspNonce = nonce
    // 開發狀態unsafe-inline
    // 最後上架再把nonce這段加上去
    // 'unsafe-inline'
    // 'nonce-${nonce}'
    // 設定 CSP header
    setHeader(event,
      'Content-Security-Policy',
      [
        `default-src 'self'`,
        `script-src 'self'  https://www.gstatic.com  'nonce-${nonce}' ` ,
        `style-src 'self' 'nonce-${nonce}' `,
        `img-src 'self' data:`,
        `connect-src 'self' wss://firebasedatabase.app wss://nuxt-shopping-web.vercel.app ws://localhost:4000 `
      ].join('; ').replace(/\s{2,}/g, ' ').trim()
    )
    if (htmlContext.head && Array.isArray(htmlContext.head)) {
        htmlContext.head = htmlContext.head.map(chunk =>
            typeof chunk === 'string'
            ? chunk
                .replace(/<script\b(?![^>]*\bnonce=)([^>]*)>/ig, `<script$1 nonce="${nonce}">`)
                .replace(/<style\b(?![^>]*\bnonce=)([^>]*)>/ig, `<style$1 nonce="${nonce}">`)
            : chunk
        )
    }

     if (htmlContext.body && Array.isArray(htmlContext.body)) {
        htmlContext.body = htmlContext.body.map(chunk =>
            typeof chunk === 'string'
            ? chunk
                .replace(/<script\b(?![^>]*\bnonce=)(?![^>]*\bsrc=)([^>]*)>/ig, `<script$1 nonce="${nonce}">`)
                .replace(/<style\b(?![^>]*\bnonce=)([^>]*)>/ig, `<style$1 nonce="${nonce}">`)
            : chunk
        )
    }

  })
})
