'use client';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ProductForm } from '..';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  className?: string;
  product: ProductWithRelations;
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
                <ProductForm product={product} onSubmit={() => router.back()} />
            </DialogContent>
        </Dialog>
    </div>
  );
};