export enum QUERY_KEYS {
    // AUTH KEYS
    CREATE_USER_ACCOUNT = "createUserAccount",
  
    // USER KEYS
    GET_CURRENT_USER = "getCurrentUser",
    GET_USERS = "getUsers",
    GET_USER_DATA_BY_UID = "getUserDataByUid",
    GET_USER_CART_LIST = "getUserCartList",
    GET_USER_SAVED_LIST = "getUserSavedList",

    // INITIAL ASSET
    GET_CATEGORY_ASSET = "getCategoryAsset",
    GET_ALL_PRODUCT = "getAllProduct",

    // CART 
    ADD_ITEM_TO_CART = "addItemToCart",

    // PRODUCT
    GET_PRODUCT_REVIEW = "getProductReview",
    FIND_RELATED_PRODUCT = "findRelatedProduct",
    GET_POPULAR_PRODUCT = "getPopularProduct",

    // SELLER
    GET_USER_INFO_FROM_SELLER_ID = "getUserInfoFromSellerId",
    GET_ALL_SELLER_PRODUCT = "getAllSellerProduct",
    ADD_SELLER_PRODUCT = "addSellerProduct",
    UPDATE_SELLER_PRODUCT = "updateSellerProduct",
    DELETE_SELLER_PRODUCT = "deleteSellerProduct",

    // ORDER
    GET_USER_ORDER_LIST = "getUserOrderList",
    ADD_ITEM_TO_ORDER = "addItemToOrder",
    UPDATE_USER_ORDER = "updateUserOrder",
    DELETE_USER_ORDER = "deleteUserOrder",
  }