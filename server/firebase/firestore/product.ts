import { db } from "#imports";
import { collection, serverTimestamp , addDoc, getDoc } from "firebase/firestore";

// 增添作品
export async function addProduct(data: { name: string, price: number }){
    const ref = await addDoc(collection(db, 'Product'), {
        ...data,
        createdAt: serverTimestamp()
    })
}
