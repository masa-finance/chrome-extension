import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

export const AlternativeButton = ({ children, className, ...rest }: ButtonProps) => {
    return <button className={"alternative-button " + className ?? ""} {...rest}>{children}</button>
}
