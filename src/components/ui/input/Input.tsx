import clsx from 'clsx';
import React, { FC, InputHTMLAttributes } from 'react';
import {
  FieldValues,
  RegisterOptions,
  useController,
  useFormContext,
} from 'react-hook-form';
import classes from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  validation?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
      >
    | undefined;
  name: string;
}

export const Input: FC<InputProps> = ({
  name,
  value,
  label,
  placeholder,
  validation,
  type,
  ...props
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules: validation });
  const errorClass = error?.message != null ? classes.label__input_error : '';
  return (
    <label className={classes.label}>
      {label}
      <input
        {...field}
        className={clsx(errorClass, classes.label__input)}
        placeholder={placeholder}
        type={type}
        value={value}
        {...props}
      />
      {error?.message && <p className={classes.label__error_message}>{error?.message}</p>}
    </label>
  );
};
