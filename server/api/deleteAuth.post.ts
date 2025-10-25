import admin from 'firebase-admin';


export default defineEventHandler(async (event) => {
    try{
        const authHeader = getHeader(event, "Authorization");
        if (!authHeader) throw new Error("未授權");
        const token = authHeader.replace("Bearer ", "");
        const decoded = await admin.auth().verifyIdToken(token);
        const uid = decoded.uid;
        await admin.auth().deleteUser(uid);
        await admin.firestore().collection("auth").doc(uid).delete();
        return { success: true };
    }catch(e){
        return { success: false, message : e };
    }   
    
});
