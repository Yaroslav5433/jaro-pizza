'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Product } from '@/generated/prisma-client';
import { cn } from '@/lib/utils';
import React from 'react';
import { ChoosePizzaForm, Title } from '..';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
  product: Product;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  
  return (
    <div className={className}>
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent
            className={cn(
            'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
            className,
            )}>
                <Title text={product.name}></Title>
            </DialogContent>
            <ChoosePizzaForm imageUrl={''} name={''} ingredients={[]} items={[]} />
        </Dialog>
    </div>
  );
};