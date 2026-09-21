import { axiosInstance } from "./instance"
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";

export const fetchCart = async (): Promise<CartDTO> => {
    const { data } = await axiosInstance.get<CartDTO>('./cart');

    return data
}

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
    const { data } = await axiosInstance.patch<CartDTO>('/cart/' + id, { quantity });

    return data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data;
  };

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>('/cart', values)).data;
};
