import React, { ButtonHTMLAttributes, FC } from 'react';
import classes from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: string;
  readonly className?: string;
  readonly Icon?: FC<React.SVGProps<SVGSVGElement>>;
}

export const Button: FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className,
  disabled,
  Icon,
  ...props
}) => {
  return (
    <button
      className={clsx(classes.button, className)}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
      {Icon && <Icon />}
    </button>
  );
};
