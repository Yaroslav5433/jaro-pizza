import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => {
  return (
    <div>
        <h1>Спасибо за покупку!</h1>

        <p>Ваш заказ #${orderId} принят и оплачен.</p>

        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    {item.productItem.product.name} - {item.quantity}
                </li>
            ))}
        </ul>
    </div>
  );
};