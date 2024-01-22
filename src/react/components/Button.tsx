import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

export const Button = ({ children, className, ...rest }: ButtonProps) => {
    return <button className={"button " + className ?? ""} {...rest}>{children}</button>
}
