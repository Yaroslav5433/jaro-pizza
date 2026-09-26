import React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => {
  return (
    <div>
        <h1>Заказ #{orderId}</h1>

        <p>Оплатите заказ на сумму {totalAmount} Eur. Передйите по <a href={paymentUrl}>по этой ссылке</a> для оплаты.</p>
    </div>
  );
};