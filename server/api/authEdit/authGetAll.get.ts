import { adminDb } from '~~/server/lib/firebase';

export default defineEventHandler(async(event)=>{
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
        if(checkLevel === false){
            throw new Error("權限不足");
        }else{
            const dataList = await adminDb.collection('auth').get();
            const data = dataList.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            }))
            return data;
        }
    }catch(e:any){
        console.error('錯誤訊息: ' ,e);
        throw createError({ statusCode: 500, statusMessage: e.message });
    }
})