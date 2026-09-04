'use client'

import React from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { Skeleton } from '../ui';

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  className?: string;
  selected: Set<string>;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = (
    {
        title,
        items,
        defaultItems,
        limit = 5,
        searchInputPlaceholder = 'Поиск...',
        className,
        onClickCheckbox,
        loading,
        defaultValue,
        selected,
        name
    }
) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className='font-bold mb-3'>{title}</p>

        {
          ...Array(limit).fill(0).map((_, index) => (
            <Skeleton key={index} className='h-5 mb-5 rounded-[8px]'/>
          ))
        }
      </div>
    );
  }

  const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())) : (defaultItems || items)?.slice(0, limit)
  
  return (
    <div className={className}>
        <p className='font-bold mb-3'>{title}</p>

        {
          showAll && 
          <div className='mb-5'>
            <Input onChange={e => onChangeSearchInput(e.target.value)} placeholder={searchInputPlaceholder} className='bg-gray-50 border-none'/>
          </div>
        }

        <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
            {list.map((item, index) => (
                <FilterCheckbox
                onCheckedChange={() => onClickCheckbox?.(item.value)}
                checked={selected?.has(item.value)}
                key={index}
                value={item.value}
                text={item.text}
                endAdornment={item.endAdornment}
                name={name}/>
            ))}
        </div>

        {items.length > limit && (
          <div className={showAll ? 'border-t border-t-neutral-100 mt-4': ''}>
            <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
              {showAll ? 'Скрыть' : '+ Показать все'}
            </button>
          </div>
        )}
    </div>
  );
};