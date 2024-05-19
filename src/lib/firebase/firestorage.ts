import { getStorage, ref, getDownloadURL, listAll, uploadString } from "firebase/storage";
import { firebaseApp } from "./config";
import { CategoryArray } from "../../types";

const storage = getStorage(firebaseApp);
const categoryRef = ref(storage, "initial_assets/category");
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
export const getCategoryAsset = async (): Promise<CategoryArray | undefined> => {
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
export async function addNewProductImage(imageUrl: string | undefined): Promise<string | undefined> {
  if (imageUrl === undefined) return undefined;

  try {
    // Create a reference to the new product image
    const newProductImageRef = ref(productRef, `product_${Date.now()}.jpg`);

    // Upload the image to Firebase Storage
    await uploadString(newProductImageRef, imageUrl, 'data_url');

    // Get the full URL of the uploaded image
    const downloadUrl = await getImgFullUrl(newProductImageRef.fullPath);
    return downloadUrl;
  } catch (error) {
    console.log("error addNewProductImage", error);
    return undefined;
  }
}