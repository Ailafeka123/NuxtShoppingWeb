// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/style/global.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/content'
  ],
  app:{
    baseURL:"/",
    head:{
      meta:[
        {
          'http-equiv': 'Content-Security-Policy',
          content: `
            img-src 'self' data:;
            connect-src 'self' wss://firebasedatabase.app wss://nuxt-shopping-web.vercel.app ws://localhost:4000;
            frame-src 'self';
          `.replace(/\s{2,}/g, ' ').trim()
        }
      ]
    }

  }
})