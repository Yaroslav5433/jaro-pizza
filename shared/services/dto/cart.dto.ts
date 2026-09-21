import { Product } from "@/generated/prisma-client";
import { Cart, CartItem, Ingredient, ProductItem } from "@/generated/prisma-client/client";

export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product
    };
    ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
    items: CartItemDTO[];
}

export interface CreateCartItemValues {
    productItemId: number;
    ingredients?: number[];
}