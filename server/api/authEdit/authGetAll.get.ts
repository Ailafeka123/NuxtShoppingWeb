import { adminDb } from '~~/server/lib/firebase';
import type {AuthType} from '~~/types/index';
import { changeTime } from '~~/server/lib/composable';
export default defineEventHandler(async(event):Promise<{success:boolean,message:AuthType[]|string}>=>{
    try{
        const authToken = getHeader(event, "Authorization");
        if (!authToken) throw createError({ statusCode: 401,statusMessage:"未授權"});
        const require = getHeader(event,"DataMethod");
        if(!require) throw createError({ statusCode: 401,statusMessage:"沒有要求"});
        // 丟給權限驗證
        const checkLevel = await $fetch('/api/authLevelCheck',
            {
                method:"GET",
                headers:{Authorization:authToken}
            }
        )
        if(checkLevel.message === false){
            throw new Error("權限不足");
        }
        // 進行查詢
        const dataList = await adminDb.collection('auth').get();
        const data:AuthType[] = dataList.docs.map(doc=>{
            const row = doc.data();
            return{
                    id:doc.id,
                    email:row.email,
                    usericon:row.userIcon,
                    userName:row.userName,
                    lastLogin:changeTime(row.lastLogin),
                    createTime:changeTime(row.createTime),
                    userLevel:row.level
            }
        })
        return {success:true,message:data};
        
    }catch(e:any){
        console.error('錯誤訊息: ' ,e);
        const msg = e instanceof Error? e.message : String(e);
        return {success:false,message:msg};
    }
})