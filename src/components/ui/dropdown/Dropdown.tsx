'use client';
import clsx from 'clsx';
import { FC, useState, useRef, useEffect } from 'react';
import classes from './Dropdown.module.scss';
import { FieldValues, RegisterOptions } from 'react-hook-form';
import { Input } from '../input/Input';
import { Option } from '@/lib/types/types';

interface DropdownProps {
  value: string;
  label?: string;
  name: string;
  placeholder: string;
  validation?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
      >
    | undefined;
  className?: string;
  options: Option[];
  setInputValue: (name: string, value: string) => void;
}

export const Dropdown: FC<DropdownProps> = ({
  value,
  name,
  validation,
  label,
  placeholder,
  className,
  options,
  setInputValue,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((el) =>
    el.title.toLowerCase().includes(value.toLowerCase())
  );

  const open = isOpen ? classes.dropdown__open : classes.dropdown__closed;

  const onClickHandler = (value: string) => {
    setInputValue(name, value);
    setIsOpen(false);
  };

  const handleFocus = () => setIsOpen(true);

  const handleBlur = () => {
    if (!options.some((el) => el.title === value)) {
      setInputValue(name, '');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={clsx(classes.dropdown, className)} ref={dropdownRef}>
      <div className={classes.dropdown__label}>
        <Input
          value={value}
          name={name}
          label={label}
          placeholder={placeholder}
          validation={validation}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          autoComplete="off"
        />
      </div>
      <ul className={clsx(classes.dropdown__content, open)}>
        {filteredOptions.length ? (
          filteredOptions.map((el) => (
            <li key={el.id} onMouseDown={() => onClickHandler(el.title)}>
              {el.title}
            </li>
          ))
        ) : (
          <div className={classes.dropdown__not_found}>Данные не найдены</div>
        )}
      </ul>
    </div>
  );
};
