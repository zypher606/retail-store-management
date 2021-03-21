import { BASE_URL } from "../constants/config.constant";
import { createPrivateAxiosInstance } from "./common.helper";


export async function fetchAllProducts() {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.get(
    `product/all`,
  );
}

export function addProductPurchase(data: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return privateAxiosInstance.post(
    `product/addNewProduct`,
    data
  );
}