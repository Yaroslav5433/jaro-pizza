import { Ingredient, ProductItem } from "@/generated/prisma-client/client";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { PizzaSize, PizzaType, mapPizzaType } from "@/shared/constants/pizza";

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const totalPrice = calcTotalPizzaPrice(
        items,
        ingredients,
        size,
        type,
        selectedIngredients,
      );

    const textDetails = `${size} см, ${mapPizzaType[type]}`;

    return { totalPrice, textDetails}
}