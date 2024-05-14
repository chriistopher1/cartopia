import { firebaseApp } from "./config";
import { addDoc, doc, getDoc, getFirestore, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { IUser, Product } from "../../types";

const db = getFirestore(firebaseApp);

// register user account
export async function registerUserData(newUser: IUser) {
  try {
    const docRef = await addDoc(collection(db, "user_table"), newUser);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}

// get userdata by uid
export async function getUserDataByUid(uid: string) {
  var userData: IUser = {
    accountId: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
  };

  try {
    const q = query(
      collection(db, "user_table"),
      where("accountId", "==", uid)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      userData.accountId = doc.data().accountId;
      userData.name = doc.data().name;
      userData.username = doc.data().username;
      userData.email = doc.data().email;
      userData.imageUrl = doc.data().imageUrl;
    });

    // console.log("query anjing  : ", userData)

    return userData;
  } catch (error) {
    console.log("error get user data : ", error);
  }
}

// get one product info
export async function getProductInfo(pid: string) : Promise<Product | null> {
  const productInfo: Product = {
    category: "",
    description: "",
    imageUrl: "",
    name: "",
    price: 0,
    review: 0,
    stock: 0,
  };

  try {
    const productRef = doc(db, 'product_table', pid);

    const productDoc = await getDoc(productRef);

    if(productDoc.exists()){

      const productData = productDoc.data();
      productInfo.category = productData.category;
      productInfo.description = productData.description;
      productInfo.imageUrl = productData.imageUrl;
      productInfo.name = productData.name;
      productInfo.price = productData.price;
      productInfo.review = productData.review;
      productInfo.stock = productData.stock;

    }

    return productInfo;
  } catch (error) {
    console.log("error fetching a product info.");
    return null;
  }
}

// get user cart list
export async function getUserCartList(uid: string | undefined) {
  if (uid == undefined) {
    console.log("no uid");
    return []; // Return an empty array or null here if there's no UID
  }

  try {
    const q = query(
      collection(db, "user_table"),
      where("accountId", "==", uid)
    );

    const querySnapshot = await getDocs(q);

    const cartListProduct: (Product | null)[] = [];

    const promises : any[] = []; 

    querySnapshot.forEach((doc) => {
      const docInfo = doc.data().cart;

      docInfo.forEach((cartProductId: any) => {
        const promise = getProductInfo(cartProductId);
        promises.push(promise);
      });
    });

    const resolvedPromises = await Promise.all(promises); 

    cartListProduct.push(...resolvedPromises); 

    // console.log("firestore : ", cartListProduct);
    // console.log("firestore 1 : ", cartListProduct.length);
    return cartListProduct; 
  } catch (error) {
    console.log("error fetching user cart list:", error);
    throw error; // Throw the error to be handled by React Query
  }
}

//get all product (temporary)
export async function getAllProduct(){

  try {
    
    const q = query(
      collection(db, "product_table")
    );

    const querySnapshot = await getDocs(q);

    const allProduct: (Product | null)[] = [];

    querySnapshot.forEach((doc) => {
      // cartListProduct.push(doc.data())
      // console.log("all product : ", doc.data())
      allProduct.push({
        category : doc.data().category,
        description : doc.data().description,
        imageUrl : doc.data().imageUrl,
        name : doc.data().name,
        price : doc.data().price,
        review: doc.data().review,
        stock: doc.data().stock
      })
    });

    // console.log("firestore : ", cartListProduct);
    // console.log("firestore 1 : ", cartListProduct.length);
    return allProduct; 

  } catch (error) {
    console.log("error on fetching all product")
  }

}