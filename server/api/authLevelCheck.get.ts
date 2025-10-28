import admin from 'firebase-admin';

export default defineEventHandler(async (event) : Promise<{success:boolean,message:boolean|string}>=>{
    try{
        const authHeader = getHeader(event, "Authorization");
        if (!authHeader) throw new Error("未授權");
        const decoded = await admin.auth().verifyIdToken(authHeader);
        const uid = decoded.uid;
        const snapshot  =  await admin.firestore().collection("auth").doc(uid).get();
        const getData = snapshot.data();
        if(!getData) throw new Error("未抓到資料");

        if(getData.level === "auth" || getData.level === "Aila"){
            return {success:true, message:true};
        }
        
        return {success:true, message:false};
    }catch(e){
        const msg = e instanceof Error ? e.message : String(e);
        return {success:false, message:msg};
    }
})