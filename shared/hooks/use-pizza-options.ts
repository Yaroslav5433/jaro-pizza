import React from "react";
import { Variant } from "../components/shared/group-variants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../components/shared/lib";
import { ProductItem } from "@/generated/prisma-client/client";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    selectedIngredients: Set<number>;
    addIngredient: (id: number) => void;
    availablePizzaSizes: Variant[];
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    
    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);
    
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]))

    const availablePizzaSizes = getAvailablePizzaSizes(items, type);

    React.useEffect(() => {
        const isAvailableSize = availablePizzaSizes?.find((item) => Number(item.value) === size && !item.disabled); 
        const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

        if (!isAvailableSize && availableSize) {
          setSize(Number(availableSize.value) as PizzaSize)
        }
      }, [type]);

    return {
        size,
        type,
        setSize,
        setType,
        selectedIngredients,
        addIngredient,
        availablePizzaSizes
    }
}