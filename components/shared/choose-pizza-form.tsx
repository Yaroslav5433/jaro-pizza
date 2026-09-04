import { cn } from '@/lib/utils';
import React from 'react';
import { ProductImage } from './product-image';

interface Props {
    imageUrl: string;
    name: string;
    ingredients: any[];
    items: any[];
    onClickAdd?: VoidFunction;
    className?: string;
  }

export const ChoosePizzaForm: React.FC<Props> = ({ 
    imageUrl,
    name,
    ingredients,
    className,
    items,
    onClickAdd, }) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
        <ProductImage imageUrl={imageUrl} size={30}/>
    </div>
  );
};