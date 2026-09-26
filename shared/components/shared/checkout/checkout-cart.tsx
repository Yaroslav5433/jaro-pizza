import React from 'react';
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from '..';
import { getCartItemDetails } from '../lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '../lib/get-cart-details';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  className?: string;
  loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({ loading, className, items, onClickCountButton, removeCartItem }) => {
  return (
    <WhiteBlock title="1. Корзина">
        <div className="flex flex-col gap-5">
            {
                loading && [...Array(4)].map((_, i) => <CheckoutItemSkeleton key={i}/>)
            }

            {!loading && items.length > 0 && items.map((item) => (
                <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={item.pizzaSize && item.pizzaType ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize) : ''}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                onClickRemove={() => removeCartItem(item.id)}/>
            ))}
        </div>
    </WhiteBlock> 
  ); 
};