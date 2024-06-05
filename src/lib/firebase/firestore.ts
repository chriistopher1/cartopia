import { firebaseApp } from "./config";
import {
  DocumentData,
  Timestamp,
  addDoc,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import {
  ICart,
  IOrder,
  IOrderItem,
  IProduct,
  IProductCart,
  IProductOrderItem,
  IReview,
  IReviewItem,
  ISaved,
  IUser,
} from "../../types";

import { v4 as uuidv4 } from "uuid";
import {
  addNewProductImage,
  addNewReviewImage,
  removeProductImage,
  uploadProfilePicture,
} from "./firestorage";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    phone: "",
    email: "",
    imageUrl: "",
    address: "",

    seller: {
      id: "",
      name: "",
      address: "",
    },
    cart: "",
    saved: "",
    order: "",
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
      userData.phone = doc.data().phone;
      userData.email = doc.data().email;
      userData.imageUrl = doc.data().imageUrl;
      userData.address = doc.data().address;
      userData.seller.id = doc.data().seller.id;
      userData.seller.name = doc.data().seller.name;
      userData.seller.address = doc.data().seller.address;
      userData.cart = doc.data().cart;
      userData.saved = doc.data().saved;
      userData.order = doc.data().order;
    });

    return userData;
  } catch (error) {
    console.log("error get user data : ", error);
  }
}

// get seller data by seller id
export async function getSellerDataBySellerId(
  sellerId: string | undefined
): Promise<IUser | undefined> {
  if (sellerId === undefined) return undefined;

  var userData: IUser = {
    accountId: "",
    name: "",
    phone: "",
    email: "",
    imageUrl: "",
    address: "",

    seller: {
      id: "",
      name: "",
      address: "",
    },
    cart: "",
    saved: "",
    order: "",
  };

  try {
    const q = query(
      collection(db, "user_table"),
      where("seller.id", "==", sellerId)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      userData.accountId = doc.data().accountId;
      userData.name = doc.data().name;
      userData.phone = doc.data().phone;
      userData.email = doc.data().email;
      userData.imageUrl = doc.data().imageUrl;

      userData.address = doc.data().address;
      userData.seller.id = doc.data().seller.id;
      userData.seller.name = doc.data().seller.name;
      userData.seller.address = doc.data().seller.address;

      userData.cart = doc.data().cart;
      userData.saved = doc.data().saved;
      userData.order = doc.data().order;
    });

    return userData;
  } catch (error) {
    console.log("error get user data : ", error);
    return undefined;
  }
}

// Additional functions remain unchanged

// get one product info
export async function getProductInfo(pid: string): Promise<IProduct | null> {
  const productInfo: IProduct = {
    category: "",
    description: "",
    imageUrl: "",
    name: "",
    price: 0,
    sold: 0,
    stock: 0,
    id: "",
    sellerId: "",
    reviewId: "",
  };

  try {
    const productRef = doc(db, "product_table", pid);

    const productDoc = await getDoc(productRef);

    if (productDoc.exists()) {
      const productData = productDoc.data();
      productInfo.category = productData.category;
      productInfo.description = productData.description;
      productInfo.imageUrl = productData.imageUrl;
      productInfo.name = productData.name;
      productInfo.price = productData.price;
      productInfo.sold = productData.sold;
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
    return; // Return an empty array or null here if there's no UID
  }

  try {
    const q = query(collection(db, "cart_table"), where("userId", "==", uid));

    const querySnapshot = await getDocs(q);

    const cartListProduct: ICart = {
      id: "",
      item: [],
      userId: "",
    };

    querySnapshot.forEach((doc) => {
      cartListProduct.id = doc.data().id;
      cartListProduct.item = doc.data().item;
      cartListProduct.userId = doc.data().userId;
    });

    return cartListProduct;
  } catch (error) {
    console.log("error fetching user cart list:", error);
    throw error; // Throw the error to be handled by React Query
  }
}

// get user cart list
export async function getUserSavedList(uid: string | undefined) {
  if (uid == undefined) {
    console.log("no uid");
    return; // Return an empty array or null here if there's no UID
  }

  try {
    const q = query(collection(db, "saved_table"), where("userId", "==", uid));

    const querySnapshot = await getDocs(q);

    const savedListProduct: ICart = {
      id: "",
      item: [],
      userId: "",
    };

    querySnapshot.forEach((doc) => {
      savedListProduct.id = doc.data().id;
      savedListProduct.item = doc.data().item;
      savedListProduct.userId = doc.data().userId;
    });

    return savedListProduct;
  } catch (error) {
    console.log("error fetching user cart list:", error);
    throw error; // Throw the error to be handled by React Query
  }
}

// get user order list
export async function getUserOrderList(uid: string | undefined) {
  if (uid == undefined) {
    console.log("no uid");
    return; // Return an empty array or null here if there's no UID
  }

  try {
    const q = query(collection(db, "order_table"), where("userId", "==", uid));

    const querySnapshot = await getDocs(q);

    const orderListProduct: IOrder = {
      id: "",
      item: [],
      userId: "",
    };

    querySnapshot.forEach((doc) => {
      orderListProduct.id = doc.data().id;
      orderListProduct.item = doc.data().item;
      orderListProduct.userId = doc.data().userId;
    });

    return orderListProduct;
  } catch (error) {
    console.log("error fetching user cart list:", error);
    throw error; // Throw the error to be handled by React Query
  }
}

//get all product (temporary)
export async function getAllProduct() {
  try {
    const q = query(collection(db, "product_table"));

    const querySnapshot = await getDocs(q);

    const allProduct: (IProduct | null)[] = [];

    querySnapshot.forEach((doc) => {
      // cartListProduct.push(doc.data())
      // console.log("all product : ", doc.data())
      allProduct.push({
        category: doc.data().category,
        description: doc.data().description,
        imageUrl: doc.data().imageUrl,
        name: doc.data().name,
        price: doc.data().price,
        sold: doc.data().sold,
        stock: doc.data().stock,
        id: doc.data().id,
        sellerId: doc.data().sellerId,
        reviewId: doc.data().reviewId,
      });
    });

    // console.log("firestore : ", cartListProduct);
    // console.log("firestore 1 : ", cartListProduct.length);
    return allProduct;
  } catch (error) {
    console.log("error on fetching all product");
  }
}

//make new cart
export async function makeNewCart(uid: string) {
  const newCartId = uuidv4();

  const newCart: ICart = {
    id: newCartId,
    userId: uid,
    item: [],
  };

  try {
    const docRef = await addDoc(collection(db, "cart_table"), newCart);
    console.log("Cart written with ID: ", docRef.id);
    return newCartId;
  } catch (error) {
    console.log("error on making new cart");
  }
}

//make new saved
export async function makeNewSaved(uid: string) {
  const newSavedId = uuidv4();

  const newCart: ISaved = {
    id: newSavedId,
    userId: uid,
    item: [],
  };

  try {
    const docRef = await addDoc(collection(db, "saved_table"), newCart);
    console.log("Saved written with ID: ", docRef.id);
    return newSavedId;
  } catch (error) {
    console.log("error on making new cart");
  }
}

//make new order
export async function makeNewOrder(uid: string) {
  const newOrderId = uuidv4();

  const newOrder: ICart = {
    id: newOrderId,
    userId: uid,
    item: [],
  };

  try {
    const docRef = await addDoc(collection(db, "order_table"), newOrder);
    console.log("Order written with ID: ", docRef.id);
    return newOrderId;
  } catch (error) {
    console.log("error on making new order");
  }
}

// add item to cart
export async function addItemToCart(newInstance: {
  newProduct: IProductCart;
  uid: string | undefined;
}) {
  try {
    const q = query(
      collection(db, "cart_table"),
      where("userId", "==", newInstance.uid)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If the cart document exists, update the item array

      const userCartRef = doc(db, "cart_table", querySnapshot.docs[0].id);
      const userCartDoc = await getDoc(userCartRef);

      if (userCartDoc.exists()) {
        const userData = userCartDoc.data();
        const currentItemArray = userData?.item || [];

        const updatedItemArray = [
          ...currentItemArray,
          {
            product: newInstance.newProduct.product,
            quantity: newInstance.newProduct.quantity,
          },
        ];

        await updateDoc(userCartRef, { item: updatedItemArray });

        console.log("Successfully added new item to cart.");
        return true;
      } else {
        console.log("Cart document does not exist.");
        return false;
      }
    } else {
      // If the cart document does not exist, return false
      console.log("Cart document does not exist.");
      return false;
    }
  } catch (error) {
    console.log("Error adding item to cart:", error);
    return false;
  }
}

// add item to saved
export async function addItemToSaved(newInstance: {
  newProduct: IProductCart;
  uid: string | undefined;
}) {
  try {
    const q = query(
      collection(db, "saved_table"),
      where("userId", "==", newInstance.uid)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If the saved document exists, update the item array

      const userSavedRef = doc(db, "saved_table", querySnapshot.docs[0].id);
      const userSavedDoc = await getDoc(userSavedRef);

      if (userSavedDoc.exists()) {
        const userData = userSavedDoc.data();
        const currentItemArray = userData?.item || [];

        const updatedItemArray = [
          ...currentItemArray,
          {
            product: newInstance.newProduct.product,
            quantity: newInstance.newProduct.quantity,
          },
        ];

        await updateDoc(userSavedRef, { item: updatedItemArray });

        console.log("Successfully added new item to saved.");
        return true;
      } else {
        console.log("Saved document does not exist.");
        return false;
      }
    } else {
      // If the saved document does not exist, return false
      console.log("Saved document does not exist.");
      return false;
    }
  } catch (error) {
    console.log("Error adding item to saved:", error);
    return false;
  }
}

// remove item from cart
export async function removeItemFromCart(
  uid: string | undefined,
  idToBeDeleted: string | undefined
): Promise<boolean> {
  try {
    const userCartList: ICart | undefined = await getUserCartList(uid);

    if (!userCartList || !userCartList.item) {
      console.log("Cart is empty or does not exist.");
      return false;
    }

    // Remove the item with the given id
    const updatedItems = userCartList.item.filter(
      (cartItem) => cartItem.product?.id !== idToBeDeleted
    );

    const q = query(collection(db, "cart_table"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userCartRef = doc(db, "cart_table", querySnapshot.docs[0].id);
      const userCartDoc = await getDoc(userCartRef);

      if (userCartDoc.exists()) {
        await updateDoc(userCartRef, { item: updatedItems });

        console.log("Successfully removed item from cart.");
        return true;
      } else {
        console.log("Cart document does not exist.");
        return false;
      }
    } else {
      console.log("Cart document does not exist.");
      return false;
    }
  } catch (error) {
    console.log("error on removing item from cart");
    return false;
  }
}

// remove item from saved
export async function removeItemFromSaved(
  uid: string | undefined,
  idToBeDeleted: string | undefined
): Promise<boolean> {
  try {
    const userSavedList: ICart | undefined = await getUserSavedList(uid);

    if (!userSavedList || !userSavedList.item) {
      console.log("Cart is empty or does not exist.");
      return false;
    }

    // Remove the item with the given id
    const updatedItems = userSavedList.item.filter(
      (savedItem) => savedItem.product?.id !== idToBeDeleted
    );

    const q = query(collection(db, "saved_table"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userCartRef = doc(db, "saved_table", querySnapshot.docs[0].id);
      const userCartDoc = await getDoc(userCartRef);

      if (userCartDoc.exists()) {
        await updateDoc(userCartRef, { item: updatedItems });

        console.log("Successfully removed item from saved.");
        return true;
      } else {
        console.log("Cart document does not exist.");
        return false;
      }
    } else {
      console.log("Cart document does not exist.");
      return false;
    }
  } catch (error) {
    console.log("error on removing item from cart");
    return false;
  }
}

// add item to order
export async function addItemToOrder(newInstance: {
  addressTo: string | undefined;
  newProduct: IProductOrderItem;
  sellerId: string | undefined;
  uid: string | undefined;
  isPaid? : boolean
}): Promise<boolean> {
  try {
    const newOrderId = uuidv4();
    const newDate = Timestamp.now();
    const newStatus = newInstance.isPaid ? "shipping" : "pending";
    const sellerInfo = await getSellerDataBySellerId(newInstance.sellerId);

    if (sellerInfo === undefined) {
      console.log("error on getting seller info");
      return false;
    }

    if (
      !newInstance.newProduct ||
      newInstance.newProduct.quantity === undefined ||
      newInstance.newProduct.product?.price === undefined
    ) {
      console.log("price or quantity is empty");
      return false;
    }

    const newTotalPrice =
      newInstance.newProduct.product?.price * newInstance.newProduct.quantity;

    const q = query(
      collection(db, "order_table"),
      where("userId", "==", newInstance.uid)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If the cart document exists, update the item array

      const userOrderRef = doc(db, "order_table", querySnapshot.docs[0].id);
      const userOrderDoc = await getDoc(userOrderRef);

      if (userOrderDoc.exists()) {
        const userData = userOrderDoc.data();
        const currentItemArray = userData?.item || [];

        const updatedItemArray = [
          ...currentItemArray,
          {
            id: newOrderId,
            date: newDate,
            shippingDate: "",
            status: newStatus,
            addressFrom: sellerInfo.seller.address,
            addressTo: newInstance.addressTo,
            totalPrice: newTotalPrice,
            item: [newInstance.newProduct],
          },
        ];

        await updateDoc(userOrderRef, { item: updatedItemArray });

        console.log("Successfully added new item to order.");
        return true;
      } else {
        console.log("Order document does not exist.");
        return false;
      }
    } else {
      // If the cart document does not exist, return false
      console.log("Order document does not exist.");
      return false;
    }
  } catch (error) {
    console.log("Error adding item to order:", error);
    return false;
  }
}

// get product review
export async function getProductReview(
  productId: string | undefined
): Promise<IReview | null> {
  const productReview: IReview = {
    id: "",
    item: [],
    productId: "",
  };

  try {
    const q = query(
      collection(db, "review_table"),
      where("productId", "==", productId)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    querySnapshot.forEach((doc) => {
      productReview.id = doc.data().id;
      productReview.item = doc.data().item;
      productReview.productId = doc.data().productId;
    });

    return productReview;
  } catch (error) {
    console.log("error fetching on product review");
    return null;
  }
}

// make a review on an order
export async function makeReview(newInstance: {
  newReview: IReviewItem | undefined;
  productReviewId: string | undefined;
  orderId: string | undefined;
  orderListId: string | undefined;
  productId: string | undefined;
}) {
  if (
    !newInstance.newReview ||
    !newInstance.productReviewId ||
    !newInstance.orderId ||
    !newInstance.orderListId
  ) {
    console.error("Invalid review data or product review ID");
    return false;
  }

  try {
    if (newInstance.newReview.imageUrl != "") {
      const imageReviewDownloadUrl = await addNewReviewImage({
        imageUrl: newInstance.newReview.imageUrl,
        productId: newInstance.productId,
      });
      newInstance.newReview.imageUrl = imageReviewDownloadUrl;
    }

    // Find the review document using productReviewId
    const q = query(
      collection(db, "review_table"),
      where("id", "==", newInstance.productReviewId)
    );
    const querySnapshot = await getDocs(q);

    console.log("1");

    if (!querySnapshot.empty) {
      // If the cart document exists, update the item array

      const userCartRef = doc(db, "review_table", querySnapshot.docs[0].id);
      const userCartDoc = await getDoc(userCartRef);
      console.log("2");
      if (userCartDoc.exists()) {
        const userData = userCartDoc.data();
        const currentItemArray = userData?.item || [];
        console.log("3");
        const updatedItemArray = [...currentItemArray, newInstance.newReview];

        await updateDoc(userCartRef, { item: updatedItemArray });
        console.log("4");
        const isCompleteReview = await completeReview({
          orderId: newInstance.orderId,
          orderListId: newInstance.orderListId,
        });
        console.log("5");
        if (!isCompleteReview) {
          return false;
        }

        console.log("New review added successfully");
        return true;
      } else {
        console.log("Review document does not exist.");
        return false;
      }
    } else {
      // If the cart document does not exist, return false
      console.log("Review document does not exist.");
      return false;
    }
  } catch (error) {
    console.error("Error adding review:", error);
    return false;
  }
}

// Get related products based on user search
export async function findRelatedProduct(search: string | undefined) {
  if (!search) {
    console.error("Search query is undefined");
    return [];
  }

  try {
    const allProducts: (IProduct | null)[] | undefined = await getAllProduct();
    if (!allProducts) {
      console.error("No products found");
      return [];
    }

    // Create a regex pattern to match the search query, case-insensitive
    const regex = new RegExp(search, "i");

    // Filter products based on the search query
    const relatedProducts = allProducts.filter((product) => {
      if (
        product?.name === undefined ||
        product.description === undefined ||
        product.category === undefined
      )
        return false;
      if (product != undefined) {
        return (
          regex.test(product.name) ||
          regex.test(product.description) ||
          regex.test(product.category)
        );
      }
      return false;
    });

    return relatedProducts;
  } catch (error) {
    console.error("Error finding related products from user query:", error);
    return [];
  }
}

// add new product review
export async function makeNewProductReview(newProductId: string | undefined) {
  const newReview: IReview = {
    id: "",
    item: [],
    productId: newProductId,
  };

  try {
    const newReviewId = uuidv4();

    newReview.id = newReviewId;

    const docRef = await addDoc(collection(db, "review_table"), newReview);
    // console.log("Saved written with ID: ", docRef.id);
    return newReviewId;
  } catch (error) {
    console.log("error on adding new product review");
    return undefined;
  }
}

// update seller info
export async function sellerRegister(newInstance: {
  shopName: string | undefined;
  address: string | undefined;
  uid: string | undefined;
}): Promise<boolean> {
  const newSellerId = uuidv4();

  try {
    const q = query(
      collection(db, "user_table"),
      where("accountId", "==", newInstance.uid)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "user_table", userDoc.id);

      await updateDoc(userRef, {
        "seller.id": newSellerId,
        "seller.name": newInstance.shopName,
        "seller.address": newInstance.address,
      });

      console.log("Seller information updated successfully");
      return true;
    } else {
      console.log("User not found");
      return false;
    }
  } catch (error) {
    console.log("Error updating seller info:", error);
    return false;
  }
}

//seller product
export async function getAllSellerProduct(sellerId: string | undefined) {
  if (!sellerId) {
    console.log("Invalid seller ID");
    return [];
  }

  try {
    const q = query(
      collection(db, "product_table"),
      where("sellerId", "==", sellerId)
    );

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return products;
  } catch (error) {
    console.error("Error fetching seller's products:", error);
    return [];
  }
}

// add new product
export async function addNewProduct(newInstance: {
  category: string | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
  name: string | undefined;
  price: number | undefined;
  stock: number | undefined;
  sellerId: string | undefined;
}) {
  try {
    const newProductId = uuidv4();

    const newImageUrl = await addNewProductImage({
      imageUrl: newInstance.imageUrl,
      productId: newProductId,
    });

    const newSold = 0;
    const newReviewId = await makeNewProductReview(newProductId);

    const newProduct: IProduct = {
      category: newInstance.category,
      description: newInstance.description,
      imageUrl: newImageUrl,
      name: newInstance.name,
      price: newInstance.price,
      sold: newSold,
      stock: newInstance.stock,
      id: newProductId,
      sellerId: newInstance.sellerId,
      reviewId: newReviewId,
    };
    const docRef = await addDoc(collection(db, "product_table"), newProduct);
    // console.log("Saved written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.log("error on adding new product");
    return false;
  }
}

// delete product
export async function deleteProduct(
  targetProduct: IProduct | undefined
): Promise<boolean> {
  if (targetProduct === undefined) return false;

  try {
    const db = getFirestore(); // Initialize Firestore

    // Delete product image
    const productImageIsDeleted = await removeProductImage(targetProduct.id);
    if (!productImageIsDeleted) return false;

    // Get all user info
    const allUserInfo = await getAllUserAccountId();

    if (allUserInfo === undefined) return false;

    // Delete the product in all user saved list and cart list
    for (const userId of allUserInfo) {
      await removeItemFromCart(userId, targetProduct.id);
      await removeItemFromSaved(userId, targetProduct.id);
    }

    // Delete review document at review_table
    const reviewRef = collection(db, "review_table");
    const reviewQuery = query(
      reviewRef,
      where("id", "==", targetProduct.reviewId)
    );

    const reviewSnapshot = await getDocs(reviewQuery);

    reviewSnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(docSnapshot.ref);
    });
    // Find product ref using query
    const productQuery = query(
      collection(db, "product_table"),
      where("id", "==", targetProduct.id)
    );
    const productSnapshot = await getDocs(productQuery);
    if (!productSnapshot.empty) {
      const productDoc = productSnapshot.docs[0];
      const productRef = doc(db, "product_table", productDoc.id);

      // Delete the product in the product_table
      await deleteDoc(productRef);
      console.log(`Product ${targetProduct.id} successfully deleted`);
      return true;
    } else {
      console.log(`Product ${targetProduct.id} not found in product_table`);
      return false;
    }
  } catch (error) {
    console.log("Error on deleting product", error);
    return false;
  }
}

// get all user account ids
export async function getAllUserAccountId(): Promise<string[] | undefined> {
  const allUserId: string[] = [];

  try {
    const userCollection = collection(db, "user_table");
    const userSnapshot = await getDocs(userCollection);

    userSnapshot.forEach((doc) => {
      allUserId.push(doc.data().accountId);
    });

    return allUserId;
  } catch (error) {
    console.log("error on getting all user account id");
    return undefined;
  }
}

// pay an order
export async function makePayment(newInstance: {
  orderId: string | undefined;
  orderListId: string | undefined;
}) {
  if (
    newInstance.orderId === undefined ||
    newInstance.orderListId === undefined
  ) {
    console.error("Invalid order ID");
    return false;
  }

  try {
    // Find the orderList using orderListId where the id == newInstance.orderListId
    const orderListQuery = query(
      collection(db, "order_table"),
      where("id", "==", newInstance.orderListId)
    );
    const orderListSnapshot = await getDocs(orderListQuery);

    if (orderListSnapshot.empty) {
      console.error("OrderList not found");
      return false;
    }

    const orderListDocRef = orderListSnapshot.docs[0].ref;
    const orderListData = orderListSnapshot.docs[0].data();

    // Find the specific order in the orderList's item array
    const orderToUpdate = orderListData.item.find(
      (order: any) => order.id === newInstance.orderId
    );
    if (!orderToUpdate) {
      console.error("Order not found in the orderList");
      return false;
    }

    // Update the status to "shipping" and set a new timestamp for shippingDate
    const updatedOrder = {
      ...orderToUpdate,
      status: "shipping",
      shippingDate: Timestamp.now(),
    };

    // Update the order in the orderList's item array
    const updatedItems = orderListData.item.map((order: any) =>
      order.id === newInstance.orderId ? updatedOrder : order
    );

    // Update the document with the modified order array
    await updateDoc(orderListDocRef, {
      item: updatedItems,
    });

    console.log("Order status updated to shipping");
    return true;
  } catch (error) {
    console.error("Error making payment:", error);
    return false;
  }
}

// complete an order
export async function completeOrder(newInstance: {
  orderId: string | undefined;
  orderListId: string | undefined;
  productId: string | undefined;
  bought: number | undefined;
}) {
  if (
    newInstance.orderId === undefined ||
    newInstance.orderListId === undefined ||
    newInstance.bought === undefined ||
    newInstance.productId === undefined
  ) {
    console.error("Invalid data");
    return false;
  }

  try {
    // Find the orderList using orderListId where the id == newInstance.orderListId
    const orderListQuery = query(
      collection(db, "order_table"),
      where("id", "==", newInstance.orderListId)
    );
    const orderListSnapshot = await getDocs(orderListQuery);

    if (orderListSnapshot.empty) {
      console.error("OrderList not found");
      return false;
    }

    const orderListDocRef = orderListSnapshot.docs[0].ref;
    const orderListData = orderListSnapshot.docs[0].data();

    // Find the specific order in the orderList's item array
    const orderToUpdate = orderListData.item.find(
      (order: any) => order.id === newInstance.orderId
    );
    if (!orderToUpdate) {
      console.error("Order not found in the orderList");
      return false;
    }

    // Update the status to "shipping" and set a new timestamp for shippingDate
    const updatedOrder = {
      ...orderToUpdate,
      status: "complete",
    };

    // Update the order in the orderList's item array
    const updatedItems = orderListData.item.map((order: any) =>
      order.id === newInstance.orderId ? updatedOrder : order
    );

    // Update the document with the modified order array
    await updateDoc(orderListDocRef, {
      item: updatedItems,
    });

    // Query for the product document reference based on newInstance.productId
    const productQuery = query(
      collection(db, "product_table"),
      where("id", "==", newInstance.productId)
    );
    const productSnapshot = await getDocs(productQuery);

    if (!productSnapshot.empty) {
      const productDocRef = productSnapshot.docs[0].ref;
      const productData = productSnapshot.docs[0].data();

      // Subtract the bought quantity from the stock
      const newStock = (productData.stock || 0) - newInstance.bought;
      if (newStock < 0) {
        console.error("Insufficient stock");
        return false;
      }

      // Add the bought quantity to the sold count
      const newSold = (productData.sold || 0) + newInstance.bought;

      // Update the product document with the new stock and sold count
      await updateDoc(productDocRef, {
        stock: newStock,
        sold: newSold,
      });

      console.log("Order status updated to complete and product stock updated");
      return true;
    } else {
      console.error("Product not found");
      return false;
    }
  } catch (error) {
    console.error("Error completing order:", error);
    return false;
  }
}

// complete a review
export async function completeReview(newInstance: {
  orderId: string | undefined;
  orderListId: string | undefined;
}) {
  if (
    newInstance.orderId === undefined ||
    newInstance.orderListId === undefined
  ) {
    console.error("Invalid order ID");
    return false;
  }

  try {
    // Find the orderList using orderListId where the id == newInstance.orderListId
    const orderListQuery = query(
      collection(db, "order_table"),
      where("id", "==", newInstance.orderListId)
    );
    const orderListSnapshot = await getDocs(orderListQuery);

    if (orderListSnapshot.empty) {
      console.error("OrderList not found");
      return false;
    }

    const orderListDocRef = orderListSnapshot.docs[0].ref;
    const orderListData = orderListSnapshot.docs[0].data();

    // Find the specific order in the orderList's item array
    const orderToUpdate = orderListData.item.find(
      (order: any) => order.id === newInstance.orderId
    );
    if (!orderToUpdate) {
      console.error("Order not found in the orderList");
      return false;
    }

    // Update the status to "shipping" and set a new timestamp for shippingDate
    const updatedOrder = {
      ...orderToUpdate,
      isReviewed: true,
    };

    // Update the order in the orderList's item array
    const updatedItems = orderListData.item.map((order: any) =>
      order.id === newInstance.orderId ? updatedOrder : order
    );

    // Update the document with the modified order array
    await updateDoc(orderListDocRef, {
      item: updatedItems,
    });

    console.log("isReviewed is changed");
    return true;
  } catch (error) {
    console.error("Error updating isReviewed:", error);
    return false;
  }
}

// filter based on category
export async function filterProductBasedOnCategory(
  searchedCategory: string | undefined
) {
  try {
    // Query the product collection based on the searched category
    const productQuery = query(
      collection(db, "product_table"),
      where("category", "==", searchedCategory)
    );

    // Execute the query
    const querySnapshot = await getDocs(productQuery);

    // Map through the query results to extract the product data
    const products = querySnapshot.docs.map((doc) => doc.data());

    // Return the list of products
    return products;
  } catch (error) {
    console.error("Error filtering products by category:", error);
    return [];
  }
}

// Update user profile information
export const updateUserProfile = async (newInstance: {
  userAccountId: string | undefined;
  profileData: Partial<IUser>;
  imageUrl?: string; // Make imageUrl optional
}): Promise<boolean> => {
  try {
    let newImageUrl;

    if (newInstance.imageUrl) {
      newImageUrl = await uploadProfilePicture(
        newInstance.userAccountId,
        newInstance.imageUrl
      );
    }

    const userCollectionRef = collection(db, "user_table");
    const userQuery = query(
      userCollectionRef,
      where("accountId", "==", newInstance.userAccountId)
    );
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      console.error("No user found with the specified account ID");
      return false;
    }

    // Assuming accountId is unique and there's only one document with this ID
    const userDocRef = querySnapshot.docs[0].ref;

    const newProfileData = {
      ...newInstance.profileData,
      ...(newImageUrl && { imageUrl: newImageUrl }),
    };

    await updateDoc(userDocRef, newProfileData);
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return false;
  }
};

// Get the top 8 most popular products, i.e., the products that are the most sold.
export const getPopularProduct = async (): Promise<IProduct[]> => {
  try {
    // Reference to the products collection
    const productsCollectionRef = collection(db, "product_table");

    // Query to get the top 8 products with the highest sales count
    const popularProductsQuery = query(
      productsCollectionRef,
      orderBy("sold", "desc"),
      limit(8)
    );

    // Execute the query
    const querySnapshot = await getDocs(popularProductsQuery);

    // If there are no products, return an empty array
    if (querySnapshot.empty) {
      console.log("No products found");
      return [];
    }

    // Map the documents to the IProduct type
    const popularProducts: IProduct[] = querySnapshot.docs.map((doc) => doc.data() as IProduct);

    return popularProducts;
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return [];
  }
};

// Get user info from seller ID
export const getUserInfoFromSellerId = async (sellerId: string | undefined): Promise<IUser | null> => {
  try {
    // Reference to the user collection
    const userCollectionRef = collection(db, "user_table");

    // Query to find the user document with the specified seller ID
    const userQuery = query(
      userCollectionRef,
      where("seller.id", "==", sellerId)
    );

    // Execute the query
    const querySnapshot = await getDocs(userQuery);

    // If no user is found, return null
    if (querySnapshot.empty) {
      console.log("No user found with the specified seller ID");
      return null;
    }

    // Assuming sellerId is unique and there's only one document with this ID
    const userDoc = querySnapshot.docs[0];
    const userInfo = userDoc.data() as IUser;

    return userInfo;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

