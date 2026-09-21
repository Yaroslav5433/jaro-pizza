import { CartItemDTO } from "@/shared/services/dto/cart.dto";

export const CalcCartItemPrice = (item: CartItemDTO): number => {
    if (!item.productItem) {
        return 0;
    }
    
    const ingredientPrice =  item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
 
    return (ingredientPrice + item.productItem.price) * item.quantity;
}