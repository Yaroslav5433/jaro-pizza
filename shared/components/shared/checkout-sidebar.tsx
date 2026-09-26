import React from 'react';
import { CheckoutItemDetails, WhiteBlock } from '.';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { cn } from 'cn';

interface Props {
  totalAmount: number;
  className?: string;
  loading?: boolean;
  submitting?: boolean;
}

const VAT = 7;
const DELIVERY_PRICE = 150;


export const CheckoutSidebar: React.FC<Props> = ({ submitting, className, totalAmount, loading }) => {
  const vatPrice = (totalAmount * VAT) / 100;    

  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
        <div className="flex flex-col gap-1">
            <span className="text-xl">Итого</span>
            {loading ? <Skeleton className='w-48 h-11'/> : <span className="h-11 text-[34px] font-extrabold">{totalAmount + vatPrice + DELIVERY_PRICE} Eur</span>}
        </div>

        <CheckoutItemDetails title={
            <div className="flex items-center">
                <Package size={18} className="mr-2 text-gray-400"/>
                Стоимость товаров:
            </div>
        } value={loading ? <Skeleton className='h-6 w-14 rounded-[6px]'/> : `${totalAmount} Eur`}/>
        <CheckoutItemDetails title={
            <div className="flex items-center">
                <Percent size={18} className="mr-2 text-gray-400"/>
                Налоги
            </div>
        } value={loading ? <Skeleton className='h-6 w-14 rounded-[6px]'/> : `${vatPrice} Eur`}/>
        <CheckoutItemDetails title={
            <div className="flex items-center">
                <Truck size={18} className="mr-2 text-gray-400"/>
                Доставка
            </div>
        } value={loading ? <Skeleton className='h-6 w-14 rounded-[6px]'/> : `${DELIVERY_PRICE} Eur`}/>

        <Button loading={submitting} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
            Перейти к оплате
            <ArrowRight className="w-5 ml-2"/>
        </Button>
    </WhiteBlock>
  );
};