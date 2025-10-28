import admin from 'firebase-admin';


export default defineEventHandler(async (event):Promise<{success:boolean,message:boolean|string}> => {
    try{
        const authHeader = getHeader(event, "Authorization");
        if (!authHeader) throw new Error("未授權");
        const decoded = await admin.auth().verifyIdToken(authHeader);
        const uid = decoded.uid;
        await admin.auth().deleteUser(uid);
        await admin.firestore().collection("auth").doc(uid).delete();
        return { success: true ,message:true};
    }catch(e){
        const msg = e instanceof Error ? e.message : String(e);
        return { success: false, message : msg };
    }   
});
