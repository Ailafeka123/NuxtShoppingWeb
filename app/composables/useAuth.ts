import {auth,db} from "~/plugins/Authstate.client";
import { setDoc, doc, serverTimestamp, updateDoc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut ,EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";

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
            userName:email,
            userIcon:"",
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

export const AuthCheckPassword = async(email:string,password:string) =>{
    const user = auth.currentUser;
    if(user === null){
        console.error(`auth 抓取錯誤`)
        return false;
    }
    try{
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential);
        return true;
    }catch(e){
        console.error(`確認錯誤:`,e);
        return false;
    }
}

export const AuthDelete = async() =>{
    console.log("刪除帳號")
    const user = auth.currentUser;
    const uid = user?.uid;
    if(user === undefined || user === null){
        return false;
    }
    if(uid === undefined || uid === null){
        return false;
    }
    try{
        await deleteDoc(doc(db,"auth",uid));
        await deleteUser(user);
        return true;
    }catch(e){
        console.error("產生錯誤:",e);
        return false;
    }
}