import { firebaseApp } from "./config";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export const readData = async () => {
  const querySnapshot = await getDocs(collection(db, "user_table"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data())
  });

};
