import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { IUser } from "../../types";
import { firebaseApp } from "./config";
import { getUserDataByUid, registerUserData } from "./firestore";

const auth = getAuth(firebaseApp);
let currentUser = auth.currentUser;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    const uid = user.uid;

    const userData = await getUserDataByUid(user.uid);

    return userData;
  } else {
    currentUser = null
  }
});

// Register Account To Firebase Authentication
export async function registerAccount(user: {
  email: string;
  password: string;
  name: string;
  username: string;
}) {
  try {
    const newUserSession = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const newUser: IUser = {
      accountId: newUserSession.user.uid,
      email: user.email,
      name: user.name,
      username: user.username,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/cartopia-68776.appspot.com/o/user_assets%2Fdefault_profile%2Fdefault-profile-pic.jpg?alt=media&token=87535156-38fa-418e-bb7b-c173c138af1e",
    };

    const insertNewUserToFirestore = await registerUserData(newUser);

    if (insertNewUserToFirestore == null) {
      console.log("error on adding data to firestore");
      return null;
    }

    return insertNewUserToFirestore;
  } catch (error) {
    console.log("register error : ", error);
    return null;
  }
}

// Sign In Account To Firebase Authentication
export async function signInAccount(user: { email: string; password: string }) {
  console.log("anjing0: ", currentUser);
  try {
    const signInUser = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const userCredential = signInUser.user;

    // console.log("anjing : ", currentUser);

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
    const maxWaitTime = 700;

    // Wait for currentUser to be not null, with timeout
    while (!currentUser && waitTime < maxWaitTime) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      waitTime += 100;
    }

    // console.log("current user anjing :", currentUser)

    if (currentUser) {
      // console.log("current user anjing :", currentUser.uid)

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
