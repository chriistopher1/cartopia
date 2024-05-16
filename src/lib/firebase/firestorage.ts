import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { firebaseApp } from "./config";
import { CategoryArray } from "../../types";

const storage = getStorage(firebaseApp);
const categoryRef = ref(storage, "initial_assets/category");

// get full image url
const getImgFullUrl = async (path: string): Promise<string | null> => {
  try {
    const downloadUrl = await getDownloadURL(ref(storage, path));

    //   console.log(downloadUrl.toString())
    return downloadUrl;
  } catch (error) {
    console.log("error getImgFull", error);
    return null;
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
