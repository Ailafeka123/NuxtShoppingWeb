// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/style/global.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/content',
    'nuxt-security'
  ],
  security: {
    headers: {
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
        ...(process.env.NODE_ENV === 'production'
          ? {
              'style-src-elem': ["'self'", "'nonce-{{nonce}}'", 'https://fonts.googleapis.com'],
              'style-src-attr': ["'none'"]
            }
          : {
              // Dev：允許 HMR 注入的 <style>（無 nonce）
              'style-src-elem': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
              'style-src-attr': ["'none'"]
            }
        ),
        'img-src': ["'self'", 'data:', 'blob:'],
        'connect-src':["'self'", 
          'https://firebasedatabase.app',
          'https://firebase.googleapis.com',
          'https://apis.google.com/',
          'https://identitytoolkit.googleapis.com/v1/',
          'https://securetoken.googleapis.com',
          'https://firestore.googleapis.com',
          'wss://firebaseinstallations.googleapis.com',
          'wss://www.googleapis.com',
          'wss://nuxt-shopping-web.vercel.app',
          'wss://identitytoolkit.googleapis.com',

          'ws://localhost:4000', 
          'ws://localhost:4001'],
        'object-src': ["'none'"],
        'frame-src':[
          'https://aila-nuxt-shoppingweb.firebaseapp.com/'
        ],
        'frame-ancestors': ["'none'"],
      },
      xContentTypeOptions: 'nosniff'
    }
  }
})