import clsx from 'clsx';
import React, { FC, TextareaHTMLAttributes } from 'react';
import {
  FieldValues,
  RegisterOptions,
  useController,
  useFormContext,
} from 'react-hook-form';
import classes from './TextArea.module.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  validation?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
      >
    | undefined;
  name: string;
}

export const TextArea: FC<TextAreaProps> = ({
  name,
  value,
  label,
  placeholder,
  validation,
  className,
  ...props
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules: validation });

  const errorClass =
    error?.message != null ? classes.label__textarea_error : '';

  return (
    <label className={classes.label}>
      {label}
      <textarea
        {...field}
        className={clsx(errorClass, classes.label__textarea, className)}
        placeholder={placeholder}
        value={value}
        {...props}
      />
      {error?.message && (
        <p className={classes.label__error_message}>{error?.message}</p>
      )}
    </label>
  );
};
