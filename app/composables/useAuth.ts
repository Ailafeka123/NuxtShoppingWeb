import {auth,db} from "~/plugins/Authstate.client";
import { setDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthLoading = async(account:string, password:string) =>{
    try{
        // 進行登入
        const userCredential = await signInWithEmailAndPassword(auth, account, password);
        const uid = userCredential.user.uid;
        // 更新最後登入時間
        await updateDoc(doc(db,"auth",uid),{
            lastLogin: serverTimestamp()
        })
        await  navigateTo('/');
        return  true
    }catch(e){
        console.error(`錯誤訊息:${e}`)
        return false;
    }
}

export const  AuthRegister = async(account:string, password:string) =>{
    try{
        // 進行註冊
        const userCredential = await createUserWithEmailAndPassword(auth,account,password);
        const uid = userCredential.user.uid;
        const email = userCredential.user.email;
        // 建立帳號資訊到firestore
        await setDoc(doc(db,"auth",uid),{
            email:email,
            level:"user",
            createTime : serverTimestamp(),
            lastLogin: serverTimestamp(),
        })
        await  navigateTo('/');
        return true;
    }catch(e){
        console.error(`錯誤訊息:${e}`);
        return false
    }
}

export const forgetAccount = async(account:string) =>{
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