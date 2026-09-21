import React from "react";
import { useCartStore } from "../store/cart";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { CartStateItem } from "../components/shared/lib/get-cart-details";

type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    addCartItem: (values: CreateCartItemValues) => void;
}

export const useCart = (): ReturnProps => {
    const fetchCartItems = useCartStore(state => state.fetchCartItems);
    const totalAmount = useCartStore(state => state.totalAmount);
    const items = useCartStore(state => state.items);
    const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
    const removeCartItem = useCartStore(state => state.removeCartItem);
    const loading = useCartStore(state => state.loading);
    const addCartItem = useCartStore(state => state.addCartItem);

    React.useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    return {
        totalAmount,
        items,
        loading,
        updateItemQuantity,
        removeCartItem,
        addCartItem
    }
}