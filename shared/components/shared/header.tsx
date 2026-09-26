'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import { AuthModal, ProfileButton, SearchInput } from '.';
import { CartButton } from './cart-button';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
  hasCart?: boolean;
  hasSearch?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasCart = true, hasSearch = true, className }) => {
    const router = useRouter();
    
    const [openAuthModal, setOpenAuthModal] = React.useState(false);
    
    const searchParams = useSearchParams();
    
    React.useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('paid')) {
            toastMessage = 'Заказ успешно оплачен';
        }

        if (searchParams.has('verified')) {
            toastMessage = 'Аккаунт успешно подтвержден';
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/')
                toast.success(toastMessage, {
                    icon: '💥',
                });  
            }, 1000);
        }
    }, []);
  
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
                <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
                
                <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
 
                {hasCart && <CartButton />}
            </div>
        </Container>
    </header>
  );
};