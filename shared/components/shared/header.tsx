import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from '.';
import { CartButton } from './cart-button';

interface Props {
  hasCart?: boolean;
  hasSearch?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasCart = true, hasSearch = true, className }) => {
  return (
    <header className={cn('border-b', className)}>
        <Container className='flex items-center justify-between py-8'>
            <Link href='/'>
                <div className='flex items-center gap-4'>
                    <Image src='/logo.png' alt='logo' width={35} height={35}/>
                    <div>
                        <h1 className='text-2xl uppercase font-black'>Jaro Pizza</h1>
                        <p className='taxe-sm text-gray-400 leading-3'>Вкусней уже некуда</p>
                    </div>
                </div>
            </Link>

            {hasSearch && <div className='mx-10 flex-1'>
                <SearchInput/>
            </div>}

            <div className='flex items-center gap-3'>
                <Button className='flex items-center gap-1' variant='outline'>
                <User size={16}/>
                Войти</Button>

                {hasCart && <CartButton />}
            </div>
        </Container>
    </header>
  );
};