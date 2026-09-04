'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './product-image';
import { GroupVariants } from './group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@/generated/prisma-client/client';
import { IngredientItem } from './ingredient-item';
import { getPizzaDetails } from './lib';
import { usePizzaOptions } from '@/shared/hooks';

interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAddCart?: VoidFunction;
    className?: string;
  }

export const ChoosePizzaForm: React.FC<Props> = ({ 
    imageUrl,
    name,
    ingredients,
    className,
    items,
    onClickAddCart, }) => {

      const {
        size,
        type,
        selectedIngredients,
        availablePizzaSizes,
        setSize,
        setType,
        addIngredient
      } = usePizzaOptions(items);

      const {totalPrice, textDetails} = getPizzaDetails(
        type,
        size,
        items,
        ingredients,
        selectedIngredients,);

      const handleClickAdd = () => {
        onClickAddCart?.();
        
      }

      return (
    <div className={cn(className, 'flex flex-1')}>
        <PizzaImage imageUrl={imageUrl} size={size}/>

        <div className='w-[490px] bg-[#f7f6f5] p-7'>
          
          <Title text={name} size='md' className='extrabold mb-1'/>

          <p className='text-gray-400'>{textDetails}</p>
          
          <div className='flex flex-col gap-3 mt-3'>
          <GroupVariants items={availablePizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)}/>
          <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)}/>
          </div>

          <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar'>
            <div className='grid grid-cols-3 gap-3'>
              {
                ingredients.map((ingredient) => (
                  <IngredientItem 
                  key={ingredient.id}
                  imageUrl={ingredient.imageUrl} 
                  name={ingredient.name} 
                  price={ingredient.price}
                  onClick={() => addIngredient(ingredient.id)}
                  active={selectedIngredients.has(ingredient.id)} />
                ))
              }
            </div>
          </div>

          <Button onClick={handleClickAdd} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
            Добавить в корзину за {totalPrice} Eur
          </Button>
        </div>
    </div>
  );
};