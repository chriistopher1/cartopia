import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  uploadString,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { firebaseApp } from "./config";
import { CategoryArray } from "../../types";

const storage = getStorage(firebaseApp);
const categoryRef = ref(storage, "initial_assets/category");
const reviewRef = ref(storage, "review_assets/");
const productRef = ref(storage, "initial_assets/product");

// get full image url
const getImgFullUrl = async (path: string): Promise<string | undefined> => {
  try {
    const downloadUrl = await getDownloadURL(ref(storage, path));

    //   console.log(downloadUrl.toString())
    return downloadUrl;
  } catch (error) {
    console.log("error getImgFull", error);
    return undefined;
  }
};

// get all category
export const getCategoryAsset = async (): Promise<
  CategoryArray | undefined
> => {
  try {
    const listAllAsset = await listAll(categoryRef);

    var categoryArray: CategoryArray = {
      name: [],
      url: [],
    };

    await Promise.all(
      listAllAsset.items.map(async (img) => {
        const imgName = img.name.split(".")[0];
        const imgPath = img.fullPath.toString();
        const imgFullUrl = await getImgFullUrl(imgPath);
        categoryArray.name.push(imgName);
        categoryArray.url.push(imgFullUrl);
      })
    );

    //   console.log(categoryArray)
    return categoryArray;
  } catch (error) {
    console.log(error);
  }
};

// add new product image to bucket
export async function addNewProductImage(newInstance: {
  imageUrl: string | undefined;
  productId: string | undefined;
}): Promise<string | undefined> {
  if (
    newInstance.imageUrl === undefined ||
    newInstance.productId === undefined
  )
    return undefined;

  try {
    // Create a reference to the new product image
    const newProductImageRef = ref(
      productRef,
      `product_${newInstance.productId}.jpg`
    );

    // Upload the image to Firebase Storage
    await uploadString(newProductImageRef, newInstance.imageUrl, "data_url");

    // Get the full URL of the uploaded image
    const downloadUrl = await getImgFullUrl(newProductImageRef.fullPath);
    return downloadUrl;
  } catch (error) {
    console.log("error addNewProductImage", error);
    return undefined;
  }
}

// delete product image
export async function removeProductImage(
  productId: string | undefined
): Promise<boolean> {
  if (productId === undefined) return false;

  try {
    // Create a reference to the file to delete
    const desertRef = ref(storage, `initial_assets/product/product_${productId}.jpg`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        return true;
      })
      .catch((error) => {
        // Uh-oh, an error occurred!

        return false;
      });

    return true;
  } catch (error) {
    console.log("error on deleting product image");
    return false;
  }
}

// add new product image to bucket
export async function addNewReviewImage(newInstance: {
  imageUrl: string | undefined;
  productId: string | undefined;
}): Promise<string | undefined> {
  if (
    newInstance.imageUrl === undefined ||
    newInstance.productId === undefined
  )
    return undefined;

  try {
    // Create a reference to the new product image
    const newProductImageRef = ref(
      reviewRef,
      `product_${newInstance.productId}.jpg`
    );

    // Upload the image to Firebase Storage
    await uploadString(newProductImageRef, newInstance.imageUrl, "data_url");

    // Get the full URL of the uploaded image
    const downloadUrl = await getImgFullUrl(newProductImageRef.fullPath);
    return downloadUrl;
  } catch (error) {
    console.log("error addNewProductImage", error);
    return undefined;
  }
}

// upload new profile picture
export const uploadProfilePicture = async ( userId: string, imageUrl : string) => {
  const newProfilePicRef = ref(storage, `user_assets/profile_picture/${userId}`);
  // Upload the image to Firebase Storage
  await uploadString(newProfilePicRef, imageUrl, "data_url");

  // Get the full URL of the uploaded image
  const downloadUrl = await getImgFullUrl(newProfilePicRef.fullPath);
  return downloadUrl;
};