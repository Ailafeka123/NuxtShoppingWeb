import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from "~/plugins/Authstate.client"
import { useRouter } from "vue-router";

export const AuthLoading = async(account:string, password:string) =>{
    console.log("進行登入")
    try{
        const userCredential = await signInWithEmailAndPassword(auth, account, password);
        const router = useRouter();
        console.log("登入成功");
        console.log(userCredential);
        await  navigateTo('/');   
        return userCredential.user;
    }catch(e){
        console.error(`錯誤訊息:${e}`)
        return e;
    }
}

export const  AuthRegister = async(account:string, password:string) =>{
    console.log("進行註冊")
    try{
        const userCredential = await createUserWithEmailAndPassword(auth,account,password);
        console.log(`註冊成功`)
        console.log(userCredential);
        return userCredential.user
    }catch(e){
        console.error(`錯誤訊息:${e}`);
        return e
    }
}

export const AuthSignOut = async() =>{
    console.log("進行登出")
    try {
        await signOut(auth);
        console.log("已登出");
    } catch (error) {
        console.error("登出失敗:", error);
    }
}