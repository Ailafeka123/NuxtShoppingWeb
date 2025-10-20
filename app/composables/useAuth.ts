import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from "~/plugins/Authstate.client"

export const AuthLoading = async(account:string, password:string) =>{
    console.log("進行登入")
    try{
        const userCredential = await signInWithEmailAndPassword(auth, account, password);
        console.log("登入成功");
        console.log(userCredential);
        await  navigateTo('/');
        return  true
    }catch(e){
        console.error(`錯誤訊息:${e}`)
        return false;
    }
}

export const  AuthRegister = async(account:string, password:string) =>{
    console.log("進行註冊")
    try{
        const userCredential = await createUserWithEmailAndPassword(auth,account,password);
        console.log(`註冊成功`)
        console.log(userCredential);
        await  navigateTo('/');
        return true;
    }catch(e){
        console.error(`錯誤訊息:${e}`);
        return false
    }
}

export const forgetAccount = async(account:string) =>{
    console.log("忘記密碼");
    try{
        await sendPasswordResetEmail(auth,account);
        return  true;
    }catch(e){
        console.error("發生錯誤",e);
        return false;
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