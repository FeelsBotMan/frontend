import { Cart } from "../models/cart.model";
import { httpClient } from "./http";
import { ROUTES } from "../constants/routes";
interface AddCartParams {
  book_id: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const response = await httpClient.post(ROUTES.CART, params);

  return response.data;
};

export const fetchCart = async () => {
  const response = await httpClient.get<Cart[]>(ROUTES.CART);
  return response.data;
};
export const deleteCart = async (cartId: number) => {
  const response = await httpClient.delete(`${ROUTES.CART}/${cartId}`);
  return response.data;
};