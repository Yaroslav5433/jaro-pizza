import { CartDTO } from "@/shared/services/dto/cart.dto";
import { CalcCartItemPrice } from "./calc-cart-item-price";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients: Array<{name: string; price: number}>;
    disabled?: boolean;
}

interface ReturnProps { 
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        price: CalcCartItemPrice(item),
        pizzaSize: item.productItem.size,
        pizzaType: item.productItem.pizzaType,
        ingredients: item.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price
        })),
        disabled: false,
    }));
    
    return {
        items,
        totalAmount: data.totalAmount,
    }    
}