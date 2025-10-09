<script setup lang="ts">
  import { ref , onMounted } from 'vue';
  const iconString = ref<string>(`/selficon/selficon.svg`)

  useHead({
    titleTemplate:"Aila-購物網站",
    meta:[
      {name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {name: "description", content: "自製的購物網站，採用Nuxt配合Vercel進行部屬。"},
      {name:"keyword",content:"Nuxt, Vue3, 購物網站, firebase, vercel"},
      {name:"author", content:"劉星緯"},
      {name:"robots", content:"index, follow"},
      { property: 'og:title', content: 'Aila-購物網站' },
      { property: 'og:description', content: '自製的購物網站，採用Nuxt配合Vercel進行部屬。' },
      { property: 'og:type', content: 'website' }
    ],
  })


  onMounted(()=>{
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // 捕捉link為icon的作為參數保存
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    console.log(`darkMode = ${darkMode}`)
    if(darkMode){
      iconString.value = `/selficon/selficon_light.svg`;
      // userClient.value = true;
    }
    if(link){
      document.head.removeChild(link);
    }
    link = document.createElement('link')
    link.rel = 'icon'
    link.href = iconString.value;
    document.head.appendChild(link);
  })
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
