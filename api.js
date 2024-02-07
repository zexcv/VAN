
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyD_XTmmrNX-9HSz0mA0tpzVaHrsGMLDBxk",
  authDomain: "vanlife-80092.firebaseapp.com",
  projectId: "vanlife-80092",
  storageBucket: "vanlife-80092.appspot.com",
  messagingSenderId: "1047283667221",
  appId: "1:1047283667221:web:0b5729a05bae9c0c8b591c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)

    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {

    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(), 
        id: doc.id
    }))
    return vans
}


export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}