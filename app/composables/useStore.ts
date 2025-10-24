import {db} from '~/plugins/Authstate.client';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// 讀取特定資料
export const readOnceData = async(method:"auth"|"production", dateId : string) =>{
    try{
        const data = await getDoc(doc(db,method,dateId));
        if(data.exists()){
            return data.data();
        }else{
            return false
        }
    }catch(e){
        return false;
    }
}
// 讀取全部資料
export const readAllDate = async(method:"auth"|"production") =>{

}

export const upperDateAuthIcon = async(uid:string, data:string) : Promise<boolean> =>{
    try{
        await updateDoc(doc(db,"auth",uid),{
                userIcon: data
            })
        return true;
    }catch(e){
        console.error("發生錯誤",e);
        return false;
    }
}