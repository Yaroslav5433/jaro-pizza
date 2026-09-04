import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from '.';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border border-b', className)}>
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

            <div className='mx-10 flex-1'>
                <SearchInput/>
            </div>

            <div className='flex items-center gap-3'>
                <Button className='flex items-center gap-1' variant='outline'>
                <User size={16}/>
                Войти</Button>

                <div>
                    <Button className='group relative'>
                        <b>20 Euro</b>
                        <span className='h-full w-px bg-white/30 mx-3'/>
                        <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
                            <ShoppingCart className='h-4 w-4 relative'/>
                            <b>3</b>
                        </div>
                        <ArrowRight
                        size={20}
                        className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                        />
                    </Button>
                </div>
            </div>
        </Container>
    </header>
  );
};