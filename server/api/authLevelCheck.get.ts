import admin from 'firebase-admin';

export default defineEventHandler(async (event)=>{
    try{
        const authHeader = getHeader(event, "Authorization");
        if (!authHeader) throw new Error("未授權");
        const token = authHeader.replace("Bearer ", "");
        const decoded = await admin.auth().verifyIdToken(token);
        const uid = decoded.uid;
        const snapshot  =  await admin.firestore().collection("auth").doc(uid).get();
        const getData = snapshot.data();
        if(!getData) return false;
        if(getData.level === "auth" || getData.level === "Aila"){
            return true;
        }
        return false;
    }catch{
        return false;
    }
})