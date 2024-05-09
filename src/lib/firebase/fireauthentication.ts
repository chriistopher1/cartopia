import {
  User,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { IUser } from "../../types";
import { firebaseApp } from "./config";
import { getUserDataByUid } from "./firestore";

const auth = getAuth(firebaseApp);
let currentUser: User | null = null; 

onAuthStateChanged(auth, (user) => {
  currentUser = user; 
});

// Register Account To Firebase Authentication
export async function registerAccount(user: IUser) {
  try {
  } catch (error) {}
}

// Sign In Account To Firebase Authentication
export async function signInAccount(user: { email: string; password: string }) {
  console.log("anjing0: ", currentUser)
  try {
    const signInUser = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const userCredential = signInUser.user;

    console.log("anjing : ", currentUser)

    return userCredential;
  } catch (error) {
    // console.log(error);
    return null;
  }
}

export async function signOutAccount() {
  try {
    await signOut(auth); // Await the signOut operation

    console.log("Sign out successful");
  } catch (error) {
    console.log(error);
  }
}

// check current user
export async function getCurrentUserData(): Promise<IUser | undefined> {
  try {

    let waitTime = 0;
    const maxWaitTime = 500;

    // Wait for currentUser to be not null, with timeout
    while (!currentUser && waitTime < maxWaitTime) {
      await new Promise(resolve => setTimeout(resolve, 100)); 
      waitTime += 100; 
    }

    if (currentUser) {
      const userData = await getUserDataByUid(currentUser.uid);

      // console.log(userData);

      return userData;
    }
    console.log("no user");
    return undefined;
  } catch (error) {
    console.log("no user error");
    return undefined;
  }
}
