import { PizzaSize, PizzaType, mapPizzaType } from "@/shared/constants/pizza"
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
    ingredients: CartStateItem['ingredients'],
    pizzaType: PizzaType,
    pizzaSize: PizzaSize,
) => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType]
    details.push(`${typeName} ${pizzaSize} см`)
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join()
}