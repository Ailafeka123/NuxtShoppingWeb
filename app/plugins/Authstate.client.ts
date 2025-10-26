// Import the functions you need from the SDKs you need
import { initializeApp,getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database'
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged,signOut} from "firebase/auth";
// client 端讀取參數
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqoSshYcssa65E4H6J7IAtcaGSNBPFLxM",
  authDomain: "aila-nuxt-shoppingweb.firebaseapp.com",
  databaseURL: "https://aila-nuxt-shoppingweb-default-rtdb.firebaseio.com",
  projectId: "aila-nuxt-shoppingweb",
  storageBucket: "aila-nuxt-shoppingweb.firebasestorage.app",
  messagingSenderId: "1091064377475",
  appId: "1:1091064377475:web:62e4f76f83e991817cebb6",
  measurementId: "G-VGJD28W4Q9"
};
// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const rtdb = getDatabase(app)

// const analytics = getAnalytics(app);


import type { User } from 'firebase/auth'
export default defineNuxtPlugin((nuxtApp)=>{
  const user = ref<null|User>(null);
  const userId = ref<string>("");
  const loading = ref<boolean>(true);
  const LoginState = ref<boolean>(false);
  // 權限等級 1最高 3最低
  const authLevel = ref<boolean>(false)
  onAuthStateChanged(auth,async(u)=>{
    // 有帳號 抓取上一次登入 超出一小時則進行撐登出，無法判店也是進行登出
    if(u){
      const lastLoginTime = u.metadata.lastSignInTime;
      if(lastLoginTime){
        const lastLoginAt:number = new Date(lastLoginTime).getTime(); // ✅ 轉成毫秒時間戳
        const nowTime: number = Date.now();
        const df = (nowTime - lastLoginAt)/1000/60/60;
        if(df > 1){
          signOut(auth);
          user.value = null;
          userId.value = "";
          LoginState.value = false;
          authLevel.value = false;
        }else{  
          user.value = u;
          userId.value = u.uid;
          LoginState.value = true;
          const data = await readOnceData("auth",userId.value);
          if(data){
            const authLevelState = await AuthLevelCheck();
            authLevel.value = authLevelState;
          }
        }
      }else{
        signOut(auth);
      }
      // 目前設定超出一個小時 則登出
    }else{
      user.value = null;
      userId.value = "";
      authLevel.value = false;
      LoginState.value = false;
    }

    loading.value = false;
  })
  nuxtApp.provide('authUser', user);
  nuxtApp.provide('authUserId',userId);
  nuxtApp.provide('authState',LoginState);
  nuxtApp.provide("pluginsLoading",loading);
  nuxtApp.provide("authLevel",authLevel);
})