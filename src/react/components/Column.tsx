import React from 'react';

type ColumnProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };


export const Column = ({ children, className, ...rest }: ColumnProps) => {
    return <div className={"column " + className || ""} {...rest}>{children}</div>
}