import React from 'react';
type RowProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

export const Row = ({ children, className, ...rest }: RowProps) => {
    return <div className={"row " + className ?? ""} {...rest}>{children}</div>
}