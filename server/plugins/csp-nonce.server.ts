import { randomBytes } from 'crypto'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (htmlContext, { event }) => {
    // 生成高熵 nonce
    const nonce = randomBytes(16).toString('base64').replace(/\+/g, '-')      // 替換 +
    .replace(/\//g, '_')      // 替換 /
    .replace(/=+$/, '')       // 去掉尾部 =

    event.context.cspNonce = nonce

    // 設定 CSP header
    event.res.setHeader(
      'Content-Security-Policy',
      [
        `default-src 'self'`,
        `script-src 'self' 'nonce-${nonce}'`,
        `style-src 'self' 'nonce-${nonce}'`,
        `img-src 'self' data:`,
        `connect-src 'self'`
      ].join('; ').replace(/\s{2,}/g, ' ').trim()
    )


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
