import { firebaseApp } from "./config";
import { getFirestore, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { IUser } from "../../types";

const db = getFirestore(firebaseApp);

export const readData = async () => {
  const querySnapshot = await getDocs(collection(db, "user_table"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
};

export async function getUserDataByUid(uid: string) {
  var userData: IUser = {
    accountId: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
  };

  try {
    const q = query(collection(db, "user_table"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      userData.accountId = doc.data().uid
      userData.name = doc.data().name
      userData.username = doc.data().username
      userData.email = doc.data().email
      userData.imageUrl = doc.data().imageUrl
    });

    return userData;
  } catch (error) {
    console.log("error get user data : ", error);
  }
}
