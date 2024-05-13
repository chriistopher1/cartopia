import { firebaseApp } from "./config";
import { addDoc, getFirestore, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { IUser } from "../../types";

const db = getFirestore(firebaseApp);

export async function registerUserData(newUser : IUser){

  try {
    const docRef = await addDoc(collection(db, "user_table"), newUser);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
  

}

export async function getUserDataByUid(uid: string) {
  var userData: IUser = {
    accountId: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    cart: [], 
    saved: []
  };

  try {

    const q = query(collection(db, "user_table"), where("accountId", "==", uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      userData.accountId = doc.data().accountId
      userData.name = doc.data().name
      userData.username = doc.data().username
      userData.email = doc.data().email
      userData.imageUrl = doc.data().imageUrl
    });

    // console.log("query anjing  : ", userData)

    return userData;
  } catch (error) {
    console.log("error get user data : ", error);
  }
}
