'use client';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ChooseProductForm, Title } from '..';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <div className={className}>
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
           <DialogContent
              className={cn(
              'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
              className,
              )}>
                  {
                    isPizzaForm ? 
                    (<ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} />) : 
                    (<ChooseProductForm imageUrl={product.imageUrl} name={product.name} />)
                  }
            </DialogContent>
        </Dialog>
    </div>
  );
};