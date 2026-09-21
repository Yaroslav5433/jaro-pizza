'use client';

import React from 'react';
import { ErrorText, FormTextarea, WhiteBlock } from '..';
import { AdressInput } from '../adress-input';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  className?: string;
}

export const CheckoutAdressForm: React.FC<Props> = ({ className }) => {
  const {control} = useFormContext();
  
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
        <div className="flex flex-col gap-5">
            <Controller
            name="adress"
            render={({field, fieldState}) => 
            <>
              <AdressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
            }
            />

            <FormTextarea
          className='text-base'
          placeholder="Коментарий к заказу"
          rows={5} name={'comment'}/>
        </div>
    </WhiteBlock>
  );
};