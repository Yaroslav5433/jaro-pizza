'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="1683cfc7f6aa3e6c60ebcd126100b45c456c63a7"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
 